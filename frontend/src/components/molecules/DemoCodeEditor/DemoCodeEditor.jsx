import { Editor } from '@monaco-editor/react';
import { motion } from 'framer-motion';

const sampleCode = `// Welcome to Project Idx
function greet() {
  console.log("Start coding with Project Idx!");
}

// Modern development environment
// Instant setup, powerful features
greet();`;

export const DemoCodeEditor = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className='w-full h-[400px] rounded-lg overflow-hidden shadow-xl'
    style={{
      width: '100%',
      height: '400px',
      borderRadius: '0.5rem',
      overflow: 'hidden',
      boxShadow:
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', // 'shadow-xl' equivalent
    }}
  >
    <Editor
      height='100%'
      defaultLanguage='javascript'
      defaultValue={sampleCode}
      theme='vs-dark'
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        readOnly: false,
      }}
    />
  </motion.div>
);
