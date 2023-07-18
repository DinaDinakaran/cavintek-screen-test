import { useForm, Controller } from "react-hook-form";
import styled from "styled-components";
import Select from "react-select";

import "./App.css";

function App() {
  let email_validation = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
  let password_validation = "(?=.*[@#$])(?=(?:.*[0-9].*){4})(?=(?:.*[A-Z].*){2})(?=(?:.*[a-z].*){2})[A-Za-z0-9@#$]{12,}$"
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch
  } = useForm({
    defaultValues: {
      name: "",
      number: "",
      email: "",
      password: "",
      conformpassword: "",
      role: { },
      married: false,
      gender: "",
    },
  });
  console.log(errors)
  const options = [
    { value: "admin", label: "Admin" },
    { value: "manager", label: "Manager" },
    { value: "staff", label: "Staff" },
  ];

  return (
    <>
      <Container>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data)
          })}
        >
          <div className="brand">
            <h2>User Details</h2>
          </div>
          <label htmlFor="name">Name</label>
          <div>
            <input
              {...register("name", {
                required: {
                  value: true,
                  message: "Please enter name",
                },
              })}
              type="text"
              placeholder="Enter  Name"
            />
            <p>{errors.name?.message}</p>
          </div>
          <label>Mobile</label>
          <div>
            <input
              {...register("number", {
                required: {
                  value: true,
                  message: "Please enter Mobile number",
                },
                 validate:(value)=>{
                  console.log(value)
                  if(!value.match("^([0|+[0-9]{1,5})?([7-9][0-9]{9})$")|| !value.length>9){
                    console.log("not valid number")
                    return "please enter valid number"
                  }
                 }
              })}
              type="number"
              placeholder="Ex:+123-456-7890"
            />
            <p>{errors.number?.message}</p>
          </div>
          <label>Email</label>
          <div>
            <input
              {...register("email", {
                required: {
                  value: true,
                  message: "Please enter email",
                },
                validate:(value)=>{
                  console.log(value)
                  if(!value.match(email_validation)){
                    console.log("not valid email")
                    return "please enter valid email"
                  }
                 }
              })}
              type="Email"
              placeholder="Ex:Dina123@gmail.com"
            />
            <p>{errors.email?.message}</p>
          </div>
          <label>Password</label>
          <div>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Please enter password",
                },
                validate:(value)=>{
                  console.log(value)
                  if(!value.match(password_validation)){
                    console.log("not valid password")
                    return "please enter valid password"
                  }
                 }
              })}
             
              type="text"
              placeholder="Ex:@#$ab5678CD"
            />
            <p>{errors.password?.message}</p>
          </div>
          <label>Conform Password </label>
          <div>
            <input
              type="password"
              {...register("conformpassword", {
                required: {
                  value: true,
                  message: "Please enter conformpassword",
                },
                validate:(val)=>{
                  if(watch("password")!==val){
                    return "make you sure both password and conformpassword"
                  }
                }
              })}
              placeholder="Enter Conform password"
            />
            <p>{errors.conformpassword?.message}</p>
          </div>
          <label>Select Your Role <small style={{color:"gray"}}>optional</small></label>
          <div>
            <Controller
              control={control}
              name="role"
              rules={{
                required:  "please select role"
              }}
              render={({ field: { onChange, onBlur, name, value, ref, required} }) => {
                console.log(errors)
                return (
                 <div>
                   <Select required ={required}
                    name={name}
                    ref={ref}
                    onChange={(e) => onChange(e)}
                    onBlur={onBlur}
                    value={value}
                    options={options}
                    getOptionLabel={(e) => e.label}
                    getOptionValue={(e) => e.value}
                    closeMenuOnSelect={true}
                  />
                  <p>{errors.role?.message}</p>
                 </div>
                );
              }}
            />
           
          </div>
          
          <label>Marital Status <small style={{color:"gray"}}>optional</small> </label>
          <div className="sub-input">
            <input {...register("married")} type="checkbox" />
            Married
          </div>
          <label>Gender Status </label>
          <div className="sub-input">
            <input
              {...register("gender", { required: "Please enter name" })}
              value="male"
              type="radio"
            />
            Male
            <input
              {...register("gender", { required: "Please enter name" })}
              value="female"
              type="radio"
            />
            Female
          </div>
          <p>{errors.gender?.message}</p>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f5f6;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 0.2rem;
    &-thumb {
      border-radius: 1rem;
      width: 0.1rem;
      background-color: #e26f6f;
    }
  }
  form {
    margin-top: 10rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #f8e8ee;
    border-radius: 2rem;
    padding: 3rem 5rem;
    width: 20%;
    @media screen and (min-width: 390px) and (max-width: 480px) {
    
     width: 30%;
    }
  @media screen and (min-width: 780px) and (max-width: 1080px) {
      width: 32%;
    }
    p {
      color: red;
    }
    div {
      p {
        color: red;
      }
    }
    input,
    Select {
      width: 90%;
      background-color: transparent;
      border: 0.1rem solid #e1aeff;
      padding: 1rem;
      border-radius: 0.4rem;
      color: #918e8e;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #ff90bb;
        outline: none;
      }
    }
    .sub-input {
      display: flex;
    }
    .btn {
      padding: 1rem 2rem;
      background-color: #e4a5ff;
      border: none;
      border-radius: 1rem;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 1rem;
      @media screen and (min-width: 390px) and (max-width: 480px) {
        padding:0.5rem 1rem;
        font-size: 12px;
       
    }
  @media screen and (min-width: 780px) and (max-width: 1080px) {
    padding:0.8rem 1.5rem;
    font-size: 12px;
      
    }
      cursor: pointer;
      &:hover {
        background-color: #ff90bb;
      }
    }
  }
`;
