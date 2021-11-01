import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Card from "../Card/Card";
import Chart from "react-apexcharts";
import { barChartData, barChartOptions } from "../dashboardElements/chartData";
import { barChartData1, barChartOptions1 } from "../dashboardElements/chartData1";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password2: "",
            errors: {},
            chartData: [],
            chartOptions: {},
        };
    }

    componentDidMount() {
        this.setState({
          chartData: barChartData,
          chartOptions: barChartOptions,
        })
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }
    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };
    onSubmit = e => {
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.props.registerUser(newUser, this.props.history);
    };
    render() {
        const { errors } = this.state;
        return (
            <div className="container">
                <div className="row">
                    <div className="col s8 offset-s2">
                        
                        <div style={{textAlign: "center", fontSize: 20, paddingTop: 40}}>Weight Tracker</div>
                        <div style={{height: "500px"}}>
                            <Chart
                                options={barChartOptions}
                                series={barChartData}
                                type="line"
                                width="100%"
                                height="100%"
                            /> 
                    
                        </div>
                        <div style={{textAlign: "center", fontSize: 20, paddingTop: 40}}>Strength Tracker</div>
                        <Chart
                            options={barChartOptions1}
                            series={barChartData1}
                        
                            type="bar"
                            width="100%"
                            height="100%"
                        />
                </div>
            </div>   
        </div>
        );
    }
}
Dashboard.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});
// export default connect(
//     mapStateToProps,
//     { registerUser }
// )(withRouter(Register));
export default Dashboard;