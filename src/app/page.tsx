'use client';

import { motion } from "framer-motion";



export default function Home() {

  return (
    <div className = 'flex justify-center items-center h-screen '>
       <motion.button 
        whileHover={{ scale: 1.1, backgroundColor: "#ff9900" }}
        whileTap={{ scale: 0.7 }}
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className = 'rounded bg-orange-400 p-2 '
        
      >
        UniCon
      </motion.button>
    </div>
  );
}
