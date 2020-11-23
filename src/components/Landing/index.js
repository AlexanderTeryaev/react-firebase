import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import Loader from 'react-loader-spinner'
import { withRouter } from 'react-router-dom';
import Firebase from '../Firebase';
import { Button } from 'reactstrap';
import Searchable from 'react-searchable-dropdown';
import { Multiselect } from 'multiselect-react-dropdown';
import Logo from '../../assets/image/logo.png';
import '../../assets/css/common.css'
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
  isShowAvailability: false,
  id: '9bVdxwMvO5QSPLtb7JIV'
};

class Landing extends Component {
  constructor (props) {
    super(props);
    this.state = {
      loading: true,
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

  componentDidMount () {
    this.getProjectData(this.state.id);
  }

  getProjectData =(id)=> {
    Firebase.firestore().collection('projects')
    .doc(id)
    .onSnapshot(documentSnapshot => {
      let data = documentSnapshot.data();
      this.setState({
        projectDetail: data,
        project: data.InterestLevel && data.InterestLevel.project ? data.InterestLevel.project : null,
        feedback: data.InterestLevel && data.InterestLevel.feedback ? data.InterestLevel.feedback : '',
        answer: data.InterestLevel && data.InterestLevel.answer ? data.InterestLevel.answer : '',
        call: data.InterestLevel && data.InterestLevel.call ? data.InterestLevel.call : '',
        feedbackDecline: data.InterestLevel && data.InterestLevel.feedbackDecline ? data.InterestLevel.feedbackDecline : '',
        availability: data.InterestLevel && data.InterestLevel.availability ? data.InterestLevel.availability : '',
        reason: data.InterestLevel && data.InterestLevel.reason ? data.InterestLevel.reason : '',
        isShowAvailability: data.InterestLevel && data.InterestLevel.reason ? this.ShowAvailability(data.InterestLevel.reason) : false,
      }, ()=>{
        this.getJobDetail(this.state.projectDetail.jobDetail)
      })
    });
  }

  getJobDetail = (jobDetail) => {
    let job = [];
    if (jobDetail.split('(').length > 1) {
      jobDetail.split('(').map(item => {
        if (item.includes(')')) {
          job.push({name: item.split(')')[0], isUrl: true})
          job.push({name: item.split(')')[1], isUrl: false})
        } else {
          job.push({name: item, isUrl: false});
        }
      })
      this.setState({
        jobDetail: job,
        loading: false
      })
    } else {

    }
  }

  handleInputChange (option) {
    this.setState({
      project: option.value,
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  ShowAvailability =(selectedList)=> {
    let isShowAvailability = false;
    selectedList.map(item=>{
      if (item.id === 0) {
        isShowAvailability = true;
      }
    });
    return isShowAvailability
  }

  onSelect (selectedList) {
    this.setState({
      isShowAvailability: this.ShowAvailability(selectedList),
      reason: selectedList,
    });
  }

  onRemove (selectedList) {
    this.setState({
      isShowAvailability: this.ShowAvailability(selectedList),
      reason: selectedList,
    });
  }

  submit () {
    const { project, answer, call, feedback, feedbackDecline, availability, reason } = this.state;

    if (project === null) {
      toastr.info("Required", 'please select one');
      return;
    }
    
    let formData = {};
    if (project === 'accept') {
      if (this.state.answer === '' || this.state.call === '') {
        toastr.info("Required", 'please insert required field');
        return;
      }
      formData = {
        project: project,
        answer: answer,
        call: call,
      };
    }

    if (project === 'moreInfo') {
      if (this.state.feedback === '') {
        toastr.info("Required", 'please insert required field');
        return;
      }
      formData = {
        project: project,
        feedback: feedback,
      };
    }

    if (project === 'decline') {
      if (this.state.feedbackDecline === '' || this.state.availability === '' || this.state.reason.length === 0) {
        toastr.info("Required", 'please insert required field');
        return;
      }
      formData = {
        project: project,
        feedbackDecline: feedbackDecline,
        availability: availability,
        reason: reason,
      };
    }

    this.setState({loading: true});
    Firebase.firestore().collection("projects").doc(this.state.id).update({
      InterestLevel: formData
    })
    .then(() => {
      this.setState({ ...INITIAL_STATE, loading: false }, () => {
        this.getProjectData(this.state.id);
        toastr.success("Success", 'successfully updated');
      });
    })
    .catch(error => {
      toastr.error("Error", error.message);
    });
  }

  render () {
    const { projectDetail } = this.state;
    return (
      <div className='main-contain'>
        {this.state.loading === false && this.state.projectDetail &&
          <div className='main'>
            <div className='card mt-4 p-4'>
              <img className='logo mb-4' src={Logo} alt='logo'/>
              <div className='mt-4'>
                <div className='ft-18 font-weight-bold mb-2'>
                  Company Name
                </div>
                <div className='d-flex flex-wrap'>
                  <div className='item'>{projectDetail.companyName ? projectDetail.companyName : ''}</div>
                  <div className='item'>{projectDetail.companyName ? projectDetail.companyName : ''}</div>
                  <div className='item'>{projectDetail.companyName ? projectDetail.companyName : ''}</div>
                </div>
              </div>
              <div className='mt-4'>
                <div className='ft-18 font-weight-bold mb-2'>
                  Company URL
                </div>
                <div className='d-flex flex-wrap'>
                  <a href= {'http://' + projectDetail.companyUrl}>{projectDetail.companyUrl}</a>
                  <a href= {'http://' + projectDetail.companyUrl}>, {projectDetail.companyUrl}</a>
                  <a href= {'http://' + projectDetail.companyUrl}>, {projectDetail.companyUrl}</a>
                </div>
              </div>
              <div className='mt-4'>
                <div className='ft-18 font-weight-bold mb-2'>
                  Company Role
                </div>
                <div className='d-flex flex-wrap'>
                  <div>{projectDetail.companyRole}</div>
                  <div>, {projectDetail.companyRole}</div>
                  <div>, {projectDetail.companyRole}</div>
                </div>
              </div>
              <div className='mt-4'>
                <div className='ft-18 font-weight-bold mb-2'>
                  Job detail
                </div>
                <div className='ft-14'>
                  {this.state.jobDetail.map((item, index)=>
                    item.isUrl ? (
                      <a key={index} href= {'http://' + item.name}>( {item.name} )</a>
                    ) : (
                      <span key={index}>{item.name}</span>
                    )
                  )}
                </div>
              </div>
              <div className='mt-4'>
                <div className='ft-18 font-weight-bold mb-2'>
                  Engagement Type
                </div>
                <div className='ft-14'>
                  {projectDetail.engagementType}
                </div>
              </div>
              <div className='mt-4 mb-4'>
                <div className='ft-18 font-weight-bold mb-2'>
                  Are you interested in this project?
                  <span className='icon'>*</span>
                </div>
                <Searchable
                  value={this.state.project} //if value is not item of options array, it would be ignored on mount
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
                    <div className='ft-14'>2. Question two</div>
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
                    {this.state.isShowAvailability && 
                    <div>
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
                    }
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
        }
        
        {this.state.loading === true && 
          <Loader
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        }
      </div>
    );
  }
}

export default withRouter(Landing);