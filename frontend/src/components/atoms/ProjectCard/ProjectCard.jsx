import { Col, Card, Button } from "antd";
import { ProjectOutlined } from "@ant-design/icons";

const ProjectCard = ({ project, onProjectClick }) => {
  return (
    <Col xs={24} sm={12} md={8} lg={6}>
      <Card
        hoverable
        style={{
          borderRadius: "8px",
          background: "#1f1f1f",
          border: "none",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
          transition: "all 0.3s",
        }}
        onClick={() => onProjectClick(project)}
      >
        <div
          style={{
            textAlign: "center",
            padding: "20px 0",
          }}
        >
          <ProjectOutlined
            style={{
              fontSize: "32px",
              color: "#40a9ff",
              marginBottom: "16px",
            }}
          />
          <h3
            style={{
              color: "white",
              marginBottom: "16px",
            }}
          >
            Project- {project}
          </h3>
          <Button
            type="primary"
            style={{
              borderRadius: "6px",
              width: "100%",
              background: "#40a9ff",
              border: "none",
            }}
          >
            Open Project
          </Button>
        </div>
      </Card>
    </Col>
  );
};

export default ProjectCard;