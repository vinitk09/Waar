import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { enquiryInterests, enquiryQueue } from "@/data/enquiries";
import { courses } from "@/data/courses";

const attempts=new Map();
export async function POST(request){
  if(request.headers.get("origin")!==new URL(request.url).origin)return NextResponse.json({error:"Invalid request origin."},{status:403});
  if(process.env.NODE_ENV!=="development")return NextResponse.json({error:"Enquiry delivery is not configured yet. Please try again once the service is available."},{status:503});
  if(Number(request.headers.get("content-length"))>16000)return NextResponse.json({error:"Enquiry is too large."},{status:413});
  let input;try{input=await request.json();}catch{return NextResponse.json({error:"Invalid enquiry."},{status:400});}
  if(!input||typeof input!=="object")return NextResponse.json({error:"Invalid enquiry."},{status:400});
  if(input.website)return NextResponse.json({error:"Unable to accept this enquiry."},{status:400});
  const fields={};const limits={name:100,organisation:160,phone:40,email:254,location:160,requirement:4000,interest:80,programme:100,audience:30,source:80};
  for(const [key,limit] of Object.entries(limits)){const value=input[key]??"";if(typeof value!=="string"||value.length>limit)return NextResponse.json({error:"Check the form fields and try again."},{status:400});fields[key]=value.trim();}
  const errors={};
  if(fields.name.length<2)errors.name="Enter your name.";
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email))errors.email="Enter a valid email address.";
  if(!/^[+()\d\s.-]{7,40}$/.test(fields.phone)||fields.phone.replace(/\D/g,"").length<7)errors.phone="Enter a valid phone number.";
  if(!fields.location)errors.location="Enter your location.";
  if(fields.requirement.length<10)errors.requirement="Tell us a little more about your requirement.";
  if(!enquiryInterests.includes(fields.interest))errors.interest="Choose an interest.";
  if(fields.programme&&!courses.some(course=>course.title===fields.programme))errors.programme="Choose a listed programme.";
  if(!["individual","aspirant","serving-personnel","organisation"].includes(fields.audience))errors.audience="Choose who you are enquiring for.";
  if(input.consent!==true)errors.consent="Confirm that we may use these details to respond.";
  if(!/^[a-f0-9-]{36}$/i.test(input.requestId??""))errors.form="Please reload the form and try again.";
  if(Object.keys(errors).length)return NextResponse.json({error:"Please check the highlighted fields.",errors},{status:400});
  const directory=path.join(process.cwd(),".data","enquiries");const filename=path.join(directory,`${input.requestId}.json`);
  try{const saved=JSON.parse(await readFile(filename,"utf8"));return NextResponse.json({reference:saved.reference,local:true});}catch(error){if(error.code!=="ENOENT")throw error;}
  const key=request.headers.get("x-forwarded-for")??"local";const recent=(attempts.get(key)??[]).filter(time=>time>Date.now()-15*60000);
  if(recent.length>=5)return NextResponse.json({error:"Too many enquiries. Please wait before trying again."},{status:429});
  attempts.set(key,[...recent,Date.now()]);
  const reference=`WAARR-${randomUUID().slice(0,8).toUpperCase()}`;
  const record={...fields,reference,queue:enquiryQueue(fields.interest,fields.audience),createdAt:new Date().toISOString(),status:"local-received",consent:true};
  await mkdir(directory,{recursive:true});
  try{await writeFile(filename,JSON.stringify(record),{flag:"wx",mode:0o600});}catch(error){if(error.code!=="EEXIST")throw error;const existing=JSON.parse(await readFile(filename,"utf8"));return NextResponse.json({reference:existing.reference,local:true});}
  return NextResponse.json({reference,local:true},{status:201});
}
