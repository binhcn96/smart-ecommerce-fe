import React from "react"
import useLocale from "hooks/useLocate"
import LoginWelcome from "components/loginWelcome"
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { createUser } from "services/user";
import { useNavigate } from "react-router-dom";

const RegistInfo = () => {
  const schema = yup.object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
  }).required();
  const navigate = useNavigate()

  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  });
  const onSubmit = async data => {
    try {
      const dataUser = {
        ...data,
        phoneNumber: sessionStorage.getItem('signup/sms/phone')
      }
      const result = await createUser(dataUser)
      if (result.status) {
        navigate('/send-email')
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <LoginWelcome>
      <div className="p-registInfo">
        <div className="p-registInfo--title">{useLocale('p.register.title')}</div>
        <div className="p-registInfo--sub">{useLocale('p.regist.info.title.sub')}</div>
        <div className="p-registInfo--group">
          <form className="p-registInfo--form" onSubmit={handleSubmit(onSubmit)}>
            <input
              type='text'
              name="username"
              className="g-input"
              placeholder={useLocale('input.placeholder.username')}
              {...register("username")}
            ></input>
            <input
              type='email'
              name="email"
              className="g-input"
              placeholder={useLocale('input.placeholder.email')}
              {...register("email")}
            ></input>
            <input
              type='password'
              name="password"
              className="g-input"
              placeholder={useLocale('input.placeholder.pass')}
              {...register("password")}
            ></input>
            <div>
              <div className="p-registInfo--form-checkbox">
                <input type='checkbox' className="g-checkbox" id='remember'></input>
                <label htmlFor="remember">{useLocale('p.regist.info.checkbox1')}</label>
              </div>
              <div className="p-registInfo--form-checkbox">
                <input type='checkbox' className="g-checkbox" id='remember'></input>
                <label htmlFor="remember">{useLocale('p.regist.info.checkbox2')}</label>
              </div>
            </div>
            <button className="g-btn p-registInfo--form-submit">{useLocale('p.regist.info.register')}</button>
          </form>
        </div>

      </div>
    </LoginWelcome>
  )
}

export default RegistInfo