import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { withRouter } from 'react-router-dom';
import Firebase from '../Firebase';
import { Button } from 'reactstrap';
import Searchable from 'react-searchable-dropdown';
import { Multiselect } from 'multiselect-react-dropdown';
import Logo from '../../assets/logo.png';
import './landing.css';

const INITIAL_STATE = {
  error: null,
  project: null,
  call: '',
  answer: '',
  feedback: '',
  feedbackDecline: '',
  availability: '',
  reason: [],
};

class Landing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      ...INITIAL_STATE,
      reasons: [
        {
          id: 0,
          name: 'I do not have availability to take this project',
        },
        {
          id: 1,
          name: 'I am not interested in working for this company',
        },
        {
          id: 2,
          name: 'I am not interested in the scope of this project',
        },
        {
          id: 3,
          name:
            'I do not have the correct skill set for this project',
        },
        {
          id: 4,
          name: 'The rate is too low',
        },
        {
          id: 5,
          name: 'Other',
        },
      ],
    };
    this.onSelect = this.onSelect.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  componentDidMount () {}

  handleInputChange (option) {
    this.setState({
      project: option.value,
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onSelect (selectedList) {
    this.setState({
      reason: selectedList,
    });
  }

  onRemove (selectedList) {
    this.setState({
      reason: selectedList,
    });
  }

  submit () {
    const { project, answer, call, feedback, feedbackDecline, availability, reason } = this.state;

    if (project === null) {
      toastr.error("Error", 'please select one');
      return;
    }
    let formData = {};
    if (project === 'accept') {
      formData = {
        project: project,
        answer: answer,
        call: call,
      };
    }

    if (project === 'moreInfo') {
      formData = {
        project: project,
        feedback: feedback,
      };
    }

    if (project === 'decline') {
      formData = {
        project: project,
        feedbackDecline: feedbackDecline,
        availability: availability,
        reason: reason,
      };
    }

    Firebase.firestore()
      .collection('projects')
      .add(formData)
      .then(() => {
        this.setState({ ...INITIAL_STATE }, () => {
          toastr.success("Error", 'successfully created');
        });
      })
      .catch(error => {
        toastr.error("Error", error.message);
      });
  }

  render () {
    return (
      <div className='main-contain'>
        <div className='main'>
          <div className='card mt-4 p-4'>
            <img className='logo mb-4' src={Logo} alt='logo'/>
            <div className='mt-4'>
              <div className='ft-18 font-weight-bold mb-2'>
                Company Name
              </div>
              <div className='d-flex flex-wrap'>
                <div className='item'>Example.com</div>
                <div className='item'>Example.com</div>
                <div className='item'>Example.com</div>
              </div>
            </div>
            <div className='mt-4'>
              <div className='ft-18 font-weight-bold mb-2'>
                Company URL
              </div>
              <div className='d-flex flex-wrap'>
                <a href='http://test.com'>test.com</a>
                <a href='http://test.com'>, test.com</a>
                <a href='http://test.com'>, test.com</a>
              </div>
            </div>
            <div className='mt-4'>
              <div className='ft-18 font-weight-bold mb-2'>
                Company Role
              </div>
              <div className='d-flex flex-wrap'>
                <div>CMO</div>
                <div>, CMO</div>
                <div>, CMO</div>
              </div>
            </div>
            <div className='mt-4'>
              <div className='ft-18 font-weight-bold mb-2'>
                Job detail
              </div>
              <div className='ft-14'>
                Search and Convert (
                <a href='http://searchandconvert.com/'>
                  searchandconvert.com
                </a>
                ) is an SEO and Google advertising agency. They create
                and manage customized online campaigns for small and
                large companies in the ecommerce and B2B space. The
                majority of their clients are in WordPress,
                Squarespace and Hubspot. They help their clients set
                up a range of tools for tracking and combine them all
                in Google Analytics and then build reports out for
                them so they can use their own data. They then work
                with them on a retainer basis, so 20-40 hours a month.
                They are looking for a Paid Search Marketer who is an
                expert in Google Search, Google Display, and Google
                Analytics. This person will be managing a number of
                their clients Google Adwords accounts. The budget they
                will be managing is TBD, but their largest client
                account ad spend is 10k a month. They use Asana for
                project management and Slack for communication, so it
                would be a plus if this person has experience working
                within those. , Search and Convert (
                <a href='http://searchandconvert.com/'>searchandconvert.com</a>
                ) is an SEO and Google advertising agency. They create
                and manage customized online campaigns for small and
                large companies in the ecommerce and B2B space. The
                majority of their clients are in WordPress,
                Squarespace and Hubspot. They help their clients set
                up a range of tools for tracking and combine them all
                in Google Analytics and then build reports out for
                them so they can use their own data. They then work
                with them on a retainer basis, so 20-40 hours a month.
                They are looking for a Paid Search Marketer who is an
                expert in Google Search, Google Display, and Google
                Analytics. This person will be managing a number of
                their clients Google Adwords accounts. The budget they
                will be managing is TBD, but their largest client
                account ad spend is 10k a month. They use Asana for
                project management and Slack for communication, so it
                would be a plus if this person has experience working
                within those. , Search and Convert (
                <a href='http://searchandconvert.com/'>searchandconvert.com</a>
                ) is an SEO and Google advertising agency. They create
                and manage customized online campaigns for small and
                large companies in the ecommerce and B2B space. The
                majority of their clients are in WordPress,
                Squarespace and Hubspot. They help their clients set
                up a range of tools for tracking and combine them all
                in Google Analytics and then build reports out for
                them so they can use their own data. They then work
                with them on a retainer basis, so 20-40 hours a month.
                They are looking for a Paid Search Marketer who is an
                expert in Google Search, Google Display, and Google
                Analytics. This person will be managing a number of
                their clients Google Adwords accounts. The budget they
                will be managing is TBD, but their largest client
                account ad spend is 10k a month. They use Asana for
                project management and Slack for communication, so it
                would be a plus if this person has experience working
                within those.
              </div>
            </div>
            <div className='mt-4'>
              <div className='ft-18 font-weight-bold mb-2'>
                Engagement Type
              </div>
              <div className='ft-14'>
                Hourly: Your hours per week are determined by the
                client based on your conversations and engagement
                scope. Generally, this is less than 20 hours per week
                but can vary week to week. Estimated number of hours
                per week will be discussed on your interview call.
              </div>
            </div>
            <div className='mt-4 mb-4'>
              <div className='ft-18 font-weight-bold mb-2'>
                Are you interested in this project?
                <span className='icon'>*</span>
              </div>
              <Searchable
                value='' //if value is not item of options array, it would be ignored on mount
                placeholder='Search' // by default "Search"
                notFoundText='No result found' // by default "No result found"
                options={[
                  {
                    value: 'accept',
                    label: 'Accept this job!',
                  },
                  {
                    value: 'moreInfo',
                    label: 'I need more info!',
                  },
                  {
                    value: 'decline',
                    label: 'No thanks - I will pass',
                  },
                ]}
                onSelect={option => {
                  this.handleInputChange(option);
                }}
                listMaxHeight={200} //by default 140
              />
            </div>
            {this.state.project === 'accept' && (
              <div>
                <div className='mt-4'>
                  <div className='ft-18 font-weight-bold mb-2'>
                    Great! Please answer the following questions:
                  </div>
                  <div className='ft-14'>1. Question one</div>
                  <div className='ft-14'>1. Question two</div>
                </div>
                <div className='mt-4'>
                  <div className='ft-18 font-weight-bold mb-2'>
                    Answers:
                  </div>
                  <textarea
                    className='form-control'
                    rows='3'
                    value={this.state.answer}
                    onChange={this.onChange}
                    name='answer'
                  />
                </div>
                <div className='mt-4'>
                  <div className='ft-18 font-weight-bold mb-2'>
                    Let's Schedule a Call
                  </div>
                  <div className='ft-14'>
                    Please share your calendar link or send 4-5 times
                    over the next 7 days (inclusive of timezone) that
                    you are available for an intro call
                  </div>
                  <textarea
                    className='form-control mt-2'
                    rows='3'
                    value={this.state.call}
                    onChange={this.onChange}
                    name='call'
                  />
                </div>
              </div>
            )}
            {this.state.project === 'moreInfo' && (
              <div className='mt-4'>
                <div className='ft-18 font-weight-bold mb-2'>
                  Feedback
                </div>
                <div className='ft-14'>
                  Please let us know what questions you have, and the
                  team will get back to you shortly.
                </div>
                <textarea
                  className='form-control mt-2'
                  rows='3'
                  value={this.state.feedback}
                  onChange={this.onChange}
                  name='feedback'
                />
              </div>
            )}
            {this.state.project === 'decline' && (
              <div>
                <div className='mt-4'>
                  <div className='ft-18 font-weight-bold mb-2'>
                    Reasons for Declining
                  </div>
                  <div className='ft-14 mb-2'>
                    No problem! Can you let us know why you are
                    passing. Please select all that apply.
                  </div>
                  <Multiselect
                    options={this.state.reasons}
                    selectedValues={this.state.reason}
                    onSelect={this.onSelect}
                    onRemove={this.onRemove}
                    displayValue='name'
                  />
                </div>
                <div className='mt-4'>
                  <div className='ft-18 font-weight-bold mb-2'>
                    Feedback
                  </div>
                  <div className='ft-14'>
                    Is there any other feedback you’d like to share
                    with the team?
                  </div>
                  <textarea
                    className='form-control mt-2'
                    rows='3'
                    value={this.state.feedbackDecline}
                    onChange={this.onChange}
                    name='feedbackDecline'
                  />
                </div>
                <div className='mt-4'>
                  <div className='ft-18 font-weight-bold mb-2'>
                    Update Availability
                  </div>
                  <div className='ft-14'>
                    Please update your availability for new projects.
                  </div>
                  <textarea
                    className='form-control mt-2'
                    rows='3'
                    value={this.state.availability}
                    onChange={this.onChange}
                    name='availability'
                  />
                </div>
              </div>
            )}
            <Button
              variant='primary'
              className='btn btn-primary mt-4 fit-content'
              onClick={() => this.submit()}
            >
              Submit
            </Button>
          </div>
          <div className='bottom'></div>
        </div>
      </div>
    );
  }
}

export default withRouter(Landing);
