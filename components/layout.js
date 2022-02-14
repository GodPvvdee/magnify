import Head from 'next/head'
import Script from 'next/script'
import Image from 'next/image'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import { useState } from 'react'
import ReactImageMagnify from 'react-image-magnify';


export default function Layout({ children, home }) {


  return (
    <>
    <div style={{width:'542px',height:'813px'}}>
    <ReactImageMagnify {...{
    smallImage: {
        alt: 'Wristwatch by Ted Baker London',
        isFluidWidth: true,
        src: "https://cdn.sanity.io/images/xm2z006s/production/cabfdd93c1a6deac356a51fa04c9d05ddba0457d-6016x4016.jpg"
    },
    largeImage: {
        src: "https://cdn.sanity.io/images/xm2z006s/production/cabfdd93c1a6deac356a51fa04c9d05ddba0457d-6016x4016.jpg",
        width: 1200,
        height: 1800
    }
}} />
     
</div>

          

    </>
  )
}
