export const lang = [
  { id: 1, imgUrl: '/images/en.png', name: 'EN', fullName: 'English' },
  { id: 2, imgUrl: '/images/vn.png', name: 'VN', fullName: 'Vietnam' },
]

export const listMenu = [
  { id: 1, urlImg: '/images/dashboard.svg', title: "c.sidebar.dashboard", tooltip: 'tooltip-c-sidebar-dashboard', path: '/' }
]

export const listSetting = [
  { id: 1, urlImg: '/images/icon_profile.svg', title: "c.header.setting.profile", path: '/profile-setting' },
  { id: 2, urlImg: '/images/icon-security.svg', title: "c.header.setting.security", path: '/security-setting' },
]

export const twoStep = [
  { id: 1, urlImg: '/images/2fa_login_pass.svg', title: "c.twofa.pass", description: 'c.twofa.pass.description', tooltip: 'tooltip-p-security-pass' },
  { id: 2, urlImg: '/images/2fa_sms_login.svg', title: "c.twofa.sms", description: 'c.twofa.sms.description', tooltip: 'tooltip-p-security-sms' },
  { id: 3, urlImg: '/images/2fa_app_login.svg', title: "c.twofa.app", description: 'c.twofa.app.description', tooltip: 'tooltip-p-security-app' },
]

export const title_body = {
  security: {
    title: 'title.security',
    imgUrl: '/images/icon-security.svg'
  },
  dashboard: {
    title: 'title.dashboard',
    imgUrl: '/images/dashboard.svg'
  },
  profileSetting: {
    title: 'title.profile.setting',
    imgUrl: '/images/icon_profile.svg'
  }
}

export const headTableProfile = [
  { title: 'Email', info: 'email' },
  { title: 'Username', info: 'user_name' },
  { title: 'Password', info: 'password' },
  { title: 'Phone Number', info: 'phone_number' },
  { title: 'Address', info: 'address' },
]