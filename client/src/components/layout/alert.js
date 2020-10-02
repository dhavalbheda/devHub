import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(item => {
        return  <div key={item.id} className={`alert alert-${item.alertType}`}>
                    {item.msg}
                </div>
    })
Alert.prototype = {
    alert: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    alerts: state.alert
})
export default connect(mapStateToProps)(Alert);