import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "../ui/button";
import FormContainer from "../form/FormContainer";
import { removeCartItemAction } from "@/utils/action";

const DeleteItemButton = ({ id }: { id: string }) => {
  return (
    <FormContainer action={removeCartItemAction}>
      <input type="hidden" name="id" value={id} />
      <Button variant="ghost" size="icon" className="cursor-pointer">
        <AiOutlineDelete className="h-4 w-4" />
      </Button>
    </FormContainer>
  );
};
export default DeleteItemButton;
