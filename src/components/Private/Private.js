import React, { Component } from 'react'
import { connect } from 'react-redux'
import './Private.css'
import axios from 'axios';
import { updateUser } from './../../ducks/reducer'

class Private extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.redirectToHome()
    }

    redirectToHome() {
        const { id, updateUser } = this.props
        if (!id) {
            //double check sessions
            axios.get('/api/user')
                .then(res => {
                    //don't move
                    //add to redux
                    updateUser(res.data)
                })
                .catch(error => {
                    //boot to the other page
                    this.props.history.push('/')
                })
        } else {
            //don't move
        }
    }

    logout = () => {
        axios.post('/auth/logout')
            .then(res => {
                this.props.updateUser({})
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err)
            })
    }

    render() {
        const { id, profile_pic, username, balance } = this.props
        return (
            <div className="Private">
                <h1 className='rainbow'>Welcome {username}</h1>
                <p>Account Number: {id}</p>
                <p>Current Balance: {balance}</p>
                {
                    profile_pic ?
                        <img src={profile_pic} alt='profile_picture' /> :
                        null
                }
                <button onClick={this.logout}>Logout</button>
            </div>
        )
    }
}

const mapStateToProps = reduxState => {
    const { id, username, profile_pic, balance } = reduxState
    return {
        id,
        username,
        profile_pic,
        balance
    }
}

const connectComponent = connect(mapStateToProps, { updateUser })(Private)
export default connectComponent