import { motion } from 'framer-motion';
import './FeatureCard.css';

export const FeatureCard = ({ icon: Icon, title, description }) => {
  return <motion.div
    whileHover={{ scale: 1.05 }}
    className=" feature-card-container"
  > 
    <Icon className="feature-icon" />
    <h3 className="feature-title">{title}</h3>
    <p className="feature-description">{description}</p>
  </motion.div>
}
