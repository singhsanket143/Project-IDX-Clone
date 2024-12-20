import { Button} from "antd";

  
export const CreateProject = ({onClick , loading}) => {
    return (
        <Button
			type='primary'
			size='large'
			style={{ height: 48, padding: '0 32px' , borderColor : "blue" }}
			onClick={onClick}
			loading = {loading}
		>
			Create Playground
		</Button>
            
    )
}