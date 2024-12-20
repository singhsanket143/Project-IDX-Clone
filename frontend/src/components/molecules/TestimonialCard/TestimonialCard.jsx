import { Avatar, Card, Typography } from 'antd';
const { Title, Text } = Typography;

export const TestimonialCard = ({ name, role, content, avatar }) => (
  <Card
    style={{
      height: '100%',
      borderRadius: 16,
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    }}
    styles={{ body: { padding: 32 } }}
  >
    <div style={{ textAlign: 'center', marginBottom: 24 }}>
      <Avatar
        src={avatar}
        size={80}
        style={{ marginBottom: 16 }}
      />
      <Title
        level={4}
        style={{ marginBottom: 4 }}
      >
        {name}
      </Title>
      <Text type='secondary'>{role}</Text>
    </div>
    <Text style={{ fontSize: 16, lineHeight: 1.6 }}>"{content}"</Text>
  </Card>
);
