import React, { Component } from 'react'
import axios from 'axios'
import './Login.css'
import { connect } from 'react-redux'
import { updateUser } from './../../ducks/reducer'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
            error: false,
            errorMSG: ''
        }
        this.login = this.login.bind(this)
    }

    componentDidMount() {
        this.redirectToPrivateContent()
    }

    handleChange(prop, val) {
        this.setState({
            [prop]: val,
            error: false,
            errorMSG: '',
            success: false,
            successMSG: ''
        })
    }

    register = () => {
        const { username, password } = this.state
        if(username && password && username.length <= 20 && password <= 20) {
            axios.post('/auth/register', { username, password })
                .then(res => {
                    // console.log(res)
                    this.props.updateUser(res.data)
                    this.props.history.push('/private')
                })
                .catch(error => {
                    this.setState({
                        error: true,
                        errorMSG: error.response.data
                    })
                })
        }
        else {
            this.setState({
                error: true,
                errorMSG: 'Username and password not valid'
            })
        }
    }

    login() {
        const { username, password } = this.state
        axios.post('/auth/login', { username, password })
            .then(res => {
                // console.log(res)
                this.props.updateUser(res.data)
                this.props.history.push('/private')
            })
            .catch(error => {
                this.setState({
                    error: true,
                    errorMSG: error.response.data
                })
            })
    }

    redirectToPrivateContent() {
        const { id } = this.props;
        
        if(id) {
            //boot to other page
            this.props.history.push('/private')
        } else {
            //double check sessions
            axios.get('/api/user')
            .then(res => {
                //boot to other page
                this.props.updateUser(res.data)
                this.props.history.push('/private')
            })
            .catch(error => {
                //don't move
            })
        }
    }

    render() {
        const { username, password } = this.state
        // console.log(this.props)

        return (
            <div className="Login">
                <input
                    placeholder='username'
                    value={username}
                    type='username'
                    onChange={(e) => this.handleChange('username', e.target.value)}
                />
                <input
                    placeholder='password'
                    value={password}
                    type='password'
                    onChange={(e) => this.handleChange('password', e.target.value)}
                />
                <button onClick={this.login}>Login</button>
                <button onClick={this.register}>Register</button>
                {
                    this.state.error ?
                        <p className='turnRedAndBack'>
                            {this.state.errorMSG}
                        </p>
                        :
                        null
                }
            </div>
        )
    }
}

const mapStateToProps = (reduxState) => {
    return {
        id: reduxState.id
    }
}

// const mapDispatchToProps = { updateUser }

const connectComponent = connect(mapStateToProps, { updateUser })(Login)
export default connectComponent