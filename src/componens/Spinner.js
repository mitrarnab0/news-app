import React, { Component } from 'react'
import Loding from '../loading.gif'

export class spinner extends Component {
    render() {
        return (
            <div className='text-center my-3'>
                <img src={Loding} alt="Loading" />
            </div>
        )
    }
}

export default spinner
