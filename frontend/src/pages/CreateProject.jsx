import { Button, Col, Row, Card } from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject";
import { useNavigate } from "react-router-dom";
import { useGetAllProjects } from "../hooks/apis/queries/useGetAllProjects";
import ProjectCard from "../components/atoms/ProjectCard/ProjectCard";
import "./CreateProject.css"; // Import the CSS file

export const CreateProject = () => {
  const { createProjectMutation, isPending } = useCreateProject();
  const { isError, data, error } = useGetAllProjects();
  const navigate = useNavigate();

  async function handleCreateProject() {
    try {
      const response = await createProjectMutation();
      navigate(`/project/${response.data}`);
    } catch (error) {
      console.error("Error creating project", error);
    }
  }


  if (isError) {
    return <div className="error-message">Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>project-idx-react</h1>
      </div>

      <Row justify="center" className="card-container">
        <Col xs={24} sm={20} md={16} lg={12}>
          <Card className="card">
            <div className="card-header">
              <h2>Create New React Project</h2>
              <p>Start a new playground and bring your ideas to life</p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={isPending ? <LoadingOutlined /> : <PlusOutlined />}
              onClick={handleCreateProject}
              loading={isPending}
              disabled={isPending}
              className={`create-button ${isPending ? "loading" : "default"}`}
            >
              {isPending ? "Creating Project..." : "Create Playground"}
            </Button>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} justify="center">
        {data?.map((project) => (
          <ProjectCard
            key={project}
            project={project}
            onProjectClick={(id) => navigate(`/project/${id}`)}
          />
        ))}
      </Row>
    </div>
  );
};

export default CreateProject;