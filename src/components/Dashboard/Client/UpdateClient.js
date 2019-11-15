import React, {Component} from 'react';
import {withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Dialog, DialogActions, DialogContent, DialogTitle, Button,
        InputLabel, MenuItem, FormControl, FormControlLabel, Select, Switch } from '@material-ui/core';
  
  const styles = theme => ({
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
  });

  class UpdateClient extends Component {

    state = {
        firstName: '',
        lastName: '',
        dropbox: '',
        agentId: '',
        isBuyer: true,
       id: this.props.clientId
    }



    // switch on Buyer Journey, true or false
    handleSwitch = journey => event => {
        this.setState({ [journey]: event.target.checked });
    };
    componentDidMount=()=>{
        this.getAgents();
        this.getClients();
    }
    getAgents=()=>{
        this.props.dispatch({type:'GET_AGENT'})
    }
    
    getClients=()=>{
        this.props.dispatch({type:'FETCH_CLIENT'})
    }
    
    handleChange = (event, keyname) => {
            this.setState({
                ...this.state, 
                [keyname]: event.target.value,
            })
            console.log(this.state);
            
        }
    
        handleSubmit = () => {
            console.log('hellooooo ',this.state);
            
            // this.props.history.push('/')
            if(this.state.firstName && this.state.lastName && this.state.dropbox && this.state.agentId )
            this.props.dispatch({
                type: 'UPDATE_CLIENT',
                payload:  this.state
                
            })
       
        }
    
        handleDelete=()=>{
            console.log('hello from delete client button!!!!');
            this.props.history.push('/')
            this.props.dispatch({ type: 'DELETE_CLIENT', payload: this.state.id});
            console.log('helllooooo from delete',this.state.id);
            
        }
      
    render() {
        const agentOptions= this.props.state.agent.map((agent)=>{
            return <MenuItem value={agent.id}
                            key={agent.id}> {agent.firstName}</MenuItem>
          })
        const { classes } = this.props;
        console.log('in updateclient.js', this.props.clientId)
        return (
            <div>
                <Dialog
                    open={this.props.state}
                    onClose={this.props.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogContent dividers>
                    <DialogTitle id="form-dialog-title" >Update Client</DialogTitle>
                    </DialogContent>
                    <DialogContent>
                   <TextField
                        label="First name"
                        placeholder="e.g. Jane"
                        value={this.state.firstName}
                        onChange={(event) => {this.handleChange(event, 'firstName')}}
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        label="Last name"
                        placeholder="e.g. Doe"
                        value={this.state.lastName}
                        onChange={(event) => { this.handleChange(event, 'lastName') }}
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                <TextField
                        label="Dropbox URL"
                        placeholder="Copy and paste dropbox url"
                        value={this.state.dropbox}
                        onChange={(event) => { this.handleChange(event, 'dropbox') }}
                        autoFocus
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                
                <FormControl className={classes.formControl}>
                        <InputLabel id="selectAgentLabel">Agent</InputLabel>
                        <Select
                            labelId="selectAgentLabel"
                            onChange={(event) => {this.handleChange(event, 'agentId')}}
                            value={this.state.agentId}
                        >
                            <MenuItem value={''}>--Select An Agent--</MenuItem>
                                {agentOptions}
                        </Select>
                    </FormControl>
                    <br></br>
                        <FormControlLabel
                            control={
                                <Switch
                                checked={this.state.journey}
                                onChange={this.handleSwitch('journey')}
                                value="journey"
                                />
                            }
                            label="Start Buyer Journey"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button   onClick={() => this.handleSubmit()} color="primary">
                        Update Client
                        </Button>
                        <Button   onClick={() => this.handleDelete()} color="primary">
                        Delete Client
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}
const mapStateToProps = state => ({
    user: state.user,
    agent: state.agent,
    state
});

export default withStyles(styles) (withRouter(connect(mapStateToProps)(UpdateClient)));
