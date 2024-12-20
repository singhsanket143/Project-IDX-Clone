import {
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
} from '@ant-design/icons';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './About.css';

import sanketImage from '../../../assets/images/sanket.jpg';

export const About = () => (
  <section className='about-section'>
    <div className='about-container'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className='about-content'
      >
        <h2 className='about-title'>About the Developer</h2>
        <img
          src={sanketImage}
          alt='Developer'
          className='about-image'
        />
        <h3 className='about-name'>Sanket Singh</h3>
        <p className='about-description'>
          Software Engineer 2 @Microsoft | Ex-Software Engineer
          <br />
          @Google | Ex-SWE @LinkedIn | GSoC @BKCHarvard | Educator | Youtuber
          (47k+)
        </p>
        <div className='social-links'>
          <Link
            to='https://github.com/singhsanket143'
            className='social-link'
          >
            <GithubOutlined />
          </Link>
          <Link
            to='https://www.linkedin.com/in/singhsanket143/?originalSubdomain=in'
            className='social-link'
          >
            <LinkedinOutlined />
          </Link>
          <Link
            to='https://x.com/isanketsingh'
            className='social-link'
          >
            <TwitterOutlined />
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
);
