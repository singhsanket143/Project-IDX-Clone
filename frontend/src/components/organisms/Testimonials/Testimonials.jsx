import { motion } from 'framer-motion';
import { Row, Col, Typography } from 'antd';
import { TestimonialCard } from '../../molecules/TestimonialCard/TestimonialCard';
import { commonStyles } from '../../../styles/common';

const { Title } = Typography;

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Frontend Developer',
    content: 'Project Idx has revolutionized my development workflow. The instant setup and powerful features are game-changing.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100',
  },
  {
    name: 'Michael Chen',
    role: 'Full Stack Engineer',
    content: 'The collaboration features and instant environment setup have made our team much more productive.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Tech Lead',
    content: 'Having a consistent development environment across the team has eliminated so many headaches.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100',
  },
];

export const Testimonials = () => (
  <section style={{ background: '#d9d1d0' }}>
    <div style={commonStyles.section}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Title style={commonStyles.title}>What Developers Say</Title>
        <Row gutter={[32, 32]}>
          {testimonials.map((testimonial, index) => (
            <Col xs={24} md={8} key={testimonial.name}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            </Col>
          ))}
        </Row>
      </motion.div>
    </div>
  </section>
);