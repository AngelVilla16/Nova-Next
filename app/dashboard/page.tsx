"use client";
import Header from '@/components/Header';
import { userAgent } from 'next/server';
import '@/styles/dash.css';

export default function dashboard(){
    return(
        <>
           <Header/>
        </>
    );
}