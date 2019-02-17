import React from 'react';
import { Session } from 'meteor/session'
import { withTracker } from 'meteor/react-meteor-data';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


function AlertDialog(props) {

    function handleClose() {
        Session.set('errorMessage', '')
    }

    return (
        <div>
            <Dialog
                open={!!props.error}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AlertDialogWithTracker = withTracker(() => {
    return {
        error: Session.get('errorMessage'),
    }
})(AlertDialog);