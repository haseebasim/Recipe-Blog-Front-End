import React, {useEffect , useState} from  'react'
import './AdminLogin.css'
import Logo from '../../assets/logo.svg'
const AdminLogin = ({setShow})=> {

    const [adminUserName, setadminUserName] = useState('')
    const [adminPassword, setadminPassword] = useState('')
    useEffect(() => {
        setShow(false)
        return () => {
            setShow(true)
        }
    }, [setShow])


    const handleLogin = (e)=>{
        e.preventDefault();
        if(adminUserName === 'sz-admin' && adminPassword === 'admin-sz'){
        window.sessionStorage.setItem('isAdminLogedIn', true)
         window.location = `/admin/home`;
        }
    }


    return (
      <div className="admin_login">
        <img className="admin_login_img" src={Logo} alt="logo" />
        <h1 className="admin_header">Admin Login</h1>
        <form className="admin_login_form">
          <div className="admin_input_wrap">
            <label className="admin_label">Email</label>
            <div>
              <input
                className="admin_input"
                name="email"
                type="email"
                onChange={(e) => {
                  setadminUserName(e.target.value);
                }}
                placeholder="Email"
                value={adminUserName}
                required
              />
            </div>
          </div>
          <div className="admin_input_wrap">
            <label className="admin_label">Password</label>
            <div>
              <input
                className="admin_input"
                name="password"
                type="password"
                onChange={(e) => {
                  setadminPassword(e.target.value);
                }}
                placeholder="Password"
                value={adminPassword}
                required
              />
            </div>
          </div>
          <div className="admin_submit">
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </div>
        </form>
      </div>
    );
}

export default AdminLogin
