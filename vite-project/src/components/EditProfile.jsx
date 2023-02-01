import { Link, useParams } from "react-router-dom";
import { Form, InputSmall, ErrorsParagraph } from "../ui";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../auth/authContext/AuthContext";
import { updateUsers } from "../api/postUsers";

export const EditProfile = () => {
  const { editId } = useParams();
  const { logout, authState } = useContext(AuthContext);
  const { isLogged, user } = authState;
  const [updatedUserInfo, setUpdatedUserInfo] = useState({
    userName: user?.userName,
    firstName: user?.firstName,
    lastName: user?.lastName,
  });

  const { _id } = user;

  console.log(updatedUserInfo);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: updatedUserInfo,
  });

  console.log("errors", errors);

  const onSubmit = (data) => {
    console.log("data Form", data);
    const userData = { _id, ...data };
    console.log("userData", userData);
    updateUsers(userData);
    alert("Successfully updated");
    setUpdatedUserInfo(userData);
  };

  return (
    <>
      <Form action="" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>

          <InputSmall
            type="text"
            placeholder={user?.userName}
            {...register("userName", {
              minLength: {
                value: 5,
                message: "Min length is 5",
              },
            })}
          />
        </div>
        <ErrorsParagraph>{errors.userName?.message}</ErrorsParagraph>
        <div>
          <label>First Name</label>
          <InputSmall
            type="text"
            placeholder={user?.firstName}
            {...register("firstName")}
          />
        </div>
        <ErrorsParagraph>{errors.firstName?.message}</ErrorsParagraph>
        <div>
          <label>Last Name</label>
          <InputSmall
            type="text"
            placeholder={user?.lastName}
            {...register("lastName")}
          />
        </div>
        <ErrorsParagraph>{errors.lastName?.message}</ErrorsParagraph>
        <div>
          <label>Email</label>
          <InputSmall type="email" placeholder={user?.email} disabled />
        </div>

        <button type="submit" className="bt-save">
          Save
        </button>
      </Form>
    </>
  );
};
