import React, { Component } from 'react';
import { login } from './auth';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { name: '', password: '', error: false };
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    const { name, password } = this.state;
    const user = await login(name, password);
    if (user) {
      this.props.onLogin(user);
    } else {
      this.setState({ error: true });
    }
  }

  render() {
    const { name, password, error } = this.state;
    const errorMessage = error ? "Invalid Credentials" : "";
    return (
      <div className="login-page">
        <section className="section">
          <div className="container">
            <h1 className="title">Chat Login</h1>
            <form>
              <div className="field">
                <label className="label">Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="help is-danger">{errorMessage}</div>
              <div className="field is-grouped is-grouped-right">                
                <div className="control">
                  <button
                    className="button is-link"
                    onClick={this.handleSubmit}
                  >Login</button>
                </div>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}
