import Head from 'next/head'
// import Image from 'next/image'
import {Container,Header,Form} from 'semantic-ui-react'
import styles from '../styles/Home.module.css'
import pkg from 'semantic-ui-css/package.json'
import { Prisma, Role } from '@prisma/client'
import { fetcher } from '../utils/fetcher'
import prisma from "../lib/prisma"
import { useState } from 'react'

interface OptionsInterface{
  key:string,
  text:string,
  value:string,
}

const options:OptionsInterface[]=[
  {key:"d",text:"DEVELOPER",value:"DEVELOPER"},
  {key:"u",text:"USER",value:"USER"},
  {key:"a",text:"ADMIN",value:"ADMIN"},
];

export async function getServerSideProps() {
  const users:Prisma.UserUncheckedUpdateInput[]=await prisma.user.findMany();
  return {
      props:{initialUsers:users}
  };
}

export default function Home({initialUsers}) {

  const [users,setUsers]=useState<Prisma.UserUncheckedUpdateInput[]>(initialUsers);
  const [firstname,setFirstname]=useState("");
  const [lastname,setLastname]=useState("");
  const [email,setEmail]=useState("");
  const [avatar,setAvatar]=useState("");
  const [role,setRole]=useState<Role|null>(null);

  const handleChange=(
    // event: React.ChangeEvent<HTMLSelectElement, 
    value:Role)=>{
    // const value = event.target.value;    
    setRole(value)
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <Container style={{margin:'0'}}>
        <Header as="h3" className={styles.header}>
          This app is powered by NextJS, Semantic UI {pkg.version}
        </Header>
        <Form         
        onSubmit={() => {
           const body:Prisma.UserCreateInput={
            firstname,
            lastname,
            role,
            avatar,
            email
           };
           fetcher("/api/create", { user: body });
           setUsers([...users,body]);
           setFirstname("");
           setLastname("");
           setAvatar("");
           setEmail("")
           setRole(null)
        }}>
          <Form.Group widths="equal" className={styles.form_group}>
            <Form.Input 
            fluid label="First Name" 
            placeholder="First Name" 
            value={firstname} 
            onChange={(e)=>setFirstname(e.target.value)}>              
            </Form.Input>
            <br/>
            <Form.Input 
            fluid label="Last Name" 
            placeholder="Last Name" 
            value={lastname} 
            onChange={(e)=>setLastname(e.target.value)}>              
            </Form.Input>
            <br/>
            <Form.Input 
            fluid label="Email" 
            placeholder="Email" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}>              
            </Form.Input>
            <br/>
            <Form.Input 
            fluid label="Avatar" 
            placeholder="Avatar" 
            value={avatar} 
            onChange={(e)=>setAvatar(e.target.value)}>              
            </Form.Input>
            <br/>
            <Form.Select 
            fluid label="Role"
            options={options}
            placeholder="Role"
            value={role} 
            onChange={handleChange}>
            </Form.Select>
          </Form.Group>
          <Form.Button>Submit</Form.Button>
        </Form>
      </Container>      
    </div>
  )
}

