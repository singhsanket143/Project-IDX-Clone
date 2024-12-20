import { motion } from 'framer-motion';
import { FaBolt, FaCloud, FaCode } from 'react-icons/fa';
import './Features.css';

import { FeatureCard } from '../../molecules/FeatureCard/FeatureCard';

const features = [
  {
    icon: FaCode,
    title: 'Modern Editor',
    description:
      'Powerful Monaco editor with intelligent code completion and syntax highlighting',
  },
  {
    icon: FaCloud,
    title: 'Instant Setup',
    description:
      'Zero configuration required. Start coding in seconds with our cloud infrastructure',
  },
  {
    icon: FaBolt,
    title: 'Lightning Fast',
    description: 'Optimized performance for seamless development experience',
  },
];

export const Features = () => (
  <section className='features-section'>
    <div className='container'>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='features-title'
      >
        Powerful Features
      </motion.h2>
      <div className='features-grid'>
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className='feature-card-container'
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);
