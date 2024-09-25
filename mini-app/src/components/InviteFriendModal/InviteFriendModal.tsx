import React, { useEffect, useRef } from 'react';
import { Modal, Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import QRCodeStyling from 'styled-qr-code';
import useInviteFriendModalStyles from './InviteFriendModal.styles';
import { useAppStore } from '../../state/store';

interface InviteFriendModalProps {
  open: boolean;
  onClose: () => void;
}

const InviteFriendModal: React.FC<InviteFriendModalProps> = ({ open, onClose }) => {
  const classes = useInviteFriendModalStyles();
  const referralLink = useAppStore((state) => state.referralLink);

  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  // Ref for the QR code container
  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  // Ref for QRCodeStyling instance to avoid re-creating it unnecessarily
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!qrCode.current) {
      // Initialize the QRCodeStyling instance only once
      qrCode.current = new QRCodeStyling({
        width: 200,
        height: 200,
        data: referralLink,
        backgroundOptions: {
          color: 'white', // Set the background color
        },
        dotsOptions: {
          color: 'black', // Set the dots (foreground) color
          type: 'rounded', // Optional: customize the dot style
        },
      });
    } else {
      // Update the QR code data if the referralLink changes
      qrCode.current.update({ data: referralLink });
    }
  }, [referralLink]);

  useEffect(() => {
    // Append the QR code to the div container when the component mounts
    if (qrCodeRef.current && qrCode.current) {
      qrCode.current.append(qrCodeRef.current);
    }
  }, [qrCodeRef]);

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(referralLink)
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  };

  const handleSend = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(
        referralLink
      )}&text=${encodeURIComponent('Join me on this awesome app!')}`,
      '_blank'
    );
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={onClose} className={classes.modal}>
        <Box className={classes.modalContent}>
          <Typography variant="h5" gutterBottom>
            Invite a Friend
          </Typography>

          {/* Container for the QR code */}
          <div ref={qrCodeRef} className={classes.qrCodeContainer}></div>

          <Typography variant="body1" gutterBottom>
            Share your referral link to earn rewards!
          </Typography>

          <div className={classes.buttonGroup}>
            <Button variant="contained" color="primary" onClick={handleSend}>
              Send
            </Button>
            <Button variant="outlined" color="primary" onClick={handleCopyLink}>
              Copy Link
            </Button>
            <Button
              variant="text"
              color="secondary"
              onClick={onClose}
              className={classes.closeButton}
            >
              Close
            </Button>
          </div>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Referral link copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
};

export default InviteFriendModal;
