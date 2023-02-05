import React, { useEffect, useRef, useState } from "react"
import useLocale from "hooks/useLocate"
import LoginWelcome from "components/loginWelcome"
import { Link, useNavigate } from "react-router-dom";
// import CryptoJS from 'crypto-js'
import ReCAPTCHA from "react-google-recaptcha";
import { authFirebase } from "plugin/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useDispatch } from "react-redux";
import { loginSSO, loginUser } from "redux/action";

const Login = () => {
  const [user, setUser] = useState({})
  const [checked, setChecked] = useState(false)
  const navigate = useNavigate()
  const recaptchaRef = useRef();
  const dispatch = useDispatch()

  useEffect(() => {
    const userJSON = localStorage.getItem('user')
    if (userJSON) {
      const user = JSON.parse(userJSON)
      setUser(user)
      setChecked(true)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const tokenRecaptcha = await getTokenRecaptcha()
      const data = {
        ...user,
        recapchaToken: tokenRecaptcha
      }
      await dispatch(loginUser(data))
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  };

  const handleCheck = (e) => {
    if (user.email && user.password) {
      // const userEncrypt = CryptoJS.AES.encrypt(user, process.env.SETCRET_KEY_CRYPTO_JS).toString();
      if (e.target.checked) {
        localStorage.setItem('user', JSON.stringify(user))
        setChecked(true)
      } else {
        setChecked(false)
        localStorage.removeItem('user')
      }
    }
  }

  const getTokenRecaptcha = async () => {
    const token = await recaptchaRef.current.executeAsync();
    return token
  }

  const handleLoginGG = async () => {
    try {
      const recapchaToken = await getTokenRecaptcha();
      const provider = new GoogleAuthProvider();
      await signInWithPopup(authFirebase, provider);
      const tokenAuth = await authFirebase.currentUser.getIdToken();
      await dispatch(loginSSO({
        idToken: tokenAuth,
        recapchaToken,
        rule: 'firebase',
      }))
      // const resLogin = await loginGoogleSSO({
      //   idToken: tokenAuth,
      //   recapchaToken,
      //   rule: 'firebase',
      // });

      // if (resLogin.status === 'success') {
      //   setLocalStorage(resLogin?.token, resLogin?.refresh_token);
      // dispatch(changeUserInfo(resLogin?.data?.data));
      navigate('/');
      // }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LoginWelcome>
      <div className="p-login">
        <div className="p-login--title">{useLocale('p.login.title')}</div>
        <div className="p-login--type">
          <div className="p-login--type-password is-active">{useLocale('p.login.type.pass')}</div>
          <div className="p-login--type-app">{useLocale('p.login.type.app')}</div>
        </div>
        <div className="p-login--sub">{useLocale('p.login.title.sub')}</div>
        <div className="p-login--group">
          <form className="p-login--form" onSubmit={handleSubmit}>
            <input
              type='text'
              className="g-input"
              placeholder={useLocale('input.placeholder.email')}
              onChange={(e) => { setUser(pre => ({ ...pre, email: e.target.value })) }}
              value={user.email}
            ></input>
            <input
              type='password'
              className="g-input"
              placeholder={useLocale('input.placeholder.pass')}
              onChange={(e) => { setUser(pre => ({ ...pre, password: e.target.value })) }}
              value={user.password}
            ></input>
            <div className="p-login--form-sub">
              <div className="p-login--form-checkbox">
                <input
                  type='checkbox'
                  className="g-checkbox"
                  id='remember'
                  onChange={handleCheck}
                  checked={checked}
                ></input>
                <label htmlFor="remember">{useLocale('checkbox.remember')}</label>
              </div>
              <div className="p-login--form-forgot">{useLocale('p.login.fogotpass')}</div>
            </div>
            <button className="g-btn p-login--form-submit">{useLocale('p.login.btn.login')}</button>
          </form>
        </div>
        <div className="p-login--sns">
          <div className="p-login--sns-title">
            {useLocale('p.login.sns.title')}
          </div>
          <div className="p-login--sns-group">
            <div className="p-login--sns-group-icon" onClick={handleLoginGG}>
              <img src="/images/social_google.png" alt="gg_social"></img>
            </div>
            <div className="p-login--sns-group-icon">
              <img src="/images/social_twitter.png" alt="tt_social"></img>
            </div>
            <div className="p-login--sns-group-icon">
              <img src="/images/social_facebook.png" alt="fb_social"></img>
            </div>
          </div>
          <div className="p-login--link">
            <div className="p-login--link-title">{useLocale("p.login.signup.title")}</div>
            <Link to='/signup' className="p-login--link-signup">{useLocale("p.login.signup.link")}</Link>
          </div>
        </div>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_RECAPCHA_SITE_KEY}
          size='invisible'
          ref={recaptchaRef}
        />,
      </div>
    </LoginWelcome >
  )
}

export default Login