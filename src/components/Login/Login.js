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

    handleChange(prop, val) {
        this.setState({
            [prop]: val
        })
    }

    register = () => {
        const { username, password } = this.state
        axios.post('/auth/register', { username, password })
            .then(res => {
                // console.log(res)
                this.props.updateUser(res.data)
            })
    }

    login() {
        const { username, password } = this.state
        axios.post('/auth/login', { username, password })
            .then(res => {
                // console.log(res)
                this.props.updateUser(res.data)
            })
            .catch(error => {
                this.setState({
                    error: true,
                    errorMSG: error.response.data
                })
            })
    }

    render() {
        const { username, password } = this.state
        console.log(this.props)

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
                        <p>
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