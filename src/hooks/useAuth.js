const { useSelector } = require("react-redux")

const useAuth = () => {
  const user = useSelector(state => state.app.user)
  return user
}

export default useAuth