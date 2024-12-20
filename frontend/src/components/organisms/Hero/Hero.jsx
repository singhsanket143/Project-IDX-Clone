import { GithubOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateProject } from '../../../hooks/apis/mutations/useCreateProject';
import { CreateProject } from '../../../pages/CreateProject';
import { commonStyles } from '../../../styles/common';
import { Button } from '../../atoms/Button/Button';
import { DemoCodeEditor } from '../../molecules/DemoCodeEditor/DemoCodeEditor';

const { Title, Paragraph } = Typography;

export const Hero = () => {
  const { createProjectMutation, isPending } = useCreateProject();
  const navigate = useNavigate();

  async function handleCreateProject() {
    console.log('Going to trigger the api');
    try {
      const response = await createProjectMutation();
      console.log('Now we should redirect to the editor');
      navigate(`/project/${response.data}`);
    } catch (error) {
      console.log('Error creating project', error);
    }
  }
  return (
    <section
      style={{
        ...commonStyles.gradientBg,
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        className='gradient-primary'
        style={{
          ...commonStyles.gradientOverlay,
          background: '#3B82F6',
          left: '10%',
          top: '20%',
          width: '60%',
          height: '60%',
        }}
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.div
        className='gradient-secondary'
        style={{
          ...commonStyles.gradientOverlay,
          background: '#8B5CF6',
          right: '20%',
          bottom: '10%',
          width: '50%',
          height: '50%',
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <Row
        style={{ ...commonStyles.section, minHeight: '100vh' }}
        align='middle'
        gutter={[48, 48]}
      >
        <Col
          xs={24}
          lg={12}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title
              style={{
                color: '#fff',
                fontSize: 56,
                marginBottom: 24,
                lineHeight: 1.2,
              }}
            >
              Modern Development
              <br />
              <span
                style={{
                  color: '#3B82F6',
                  background: 'rgba(59, 130, 246, 0.1)',
                  padding: '0 8px',
                  borderRadius: 4,
                }}
              >
                Made Simple
              </span>
            </Title>
            <Paragraph
              style={{
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: 20,
                marginBottom: 32,
              }}
            >
              Start coding instantly with our powerful cloud IDE. No setup
              required.
            </Paragraph>
            <div style={{ display: 'flex', gap: 16 }}>
              <CreateProject
                onClick={handleCreateProject}
                loading={isPending}
              />
              <Link to='https://github.com/singhsanket143/Project-IDX-Clone'>
                <Button
                  size='large'
                  icon={<GithubOutlined />}
                  style={{
                    height: 48,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                  }}
                >
                  Star on GitHub
                </Button>
              </Link>
            </div>
          </motion.div>
        </Col>
        <Col
          xs={24}
          lg={12}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              ...commonStyles.card,
              background: '#1E1E1E',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
            }}
          >
            <DemoCodeEditor />
          </motion.div>
        </Col>
      </Row>
    </section>
  );
};
