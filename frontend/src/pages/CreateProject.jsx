import { Button, Col, Flex, Row } from "antd";
import { useCreateProject } from "../hooks/apis/mutations/useCreateProject"

  
export const CreateProject = () => {

    

    const { createProjectMutation } = useCreateProject();

    async function handleCreateProject() {
        console.log("Going to trigger the api");
        try {
            await createProjectMutation();
            console.log("Now we should redirect to the editor")
        } catch(error) {
            console.log("Error creating project", error);
        }
    }

    return (
        
        <Row>
         
            <Col span={24} >
                <Flex justify="center" align="center">
                    <Button
                            type="primary"
                            onClick={handleCreateProject}
                    >
                        Create Playground
                    </Button>
                </Flex>
            </Col>
            
        </Row>
            
    )
}