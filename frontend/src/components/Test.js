import React, { useState } from 'react';
import { Box, Container, Typography, Tab, IconButton } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Popup from './Popup';

const AIchat = () => {
  const [value, setValue] = useState('1');
  const [loading, setLoading] = useState(false); // Assuming you want to handle loading state
  const [message, setMessage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const AiQuiz = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <iframe
          src="https://enhanced-learning-platform-1.onrender.com"
          title="AI Test Quiz"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    )
  }

  const AiPlanner = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <iframe
          src="https://planner-3upq.onrender.com"
          title="AI Planner"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    )
  }

  const AiSummerizer = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <iframe
          src="https://advanced-summarizer.onrender.com"
          title="AI Summerizer"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    )
  }

  const AiStudents = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <iframe
          src="https://webhookers-zapier.onrender.com"
          title="Student Apply AI"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    )
  }

  const AiTeachers = () => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <iframe
          src="https://teachers-and-students-data-2b31d2.zapier.app/submit-form"
          title="Teacher Apply AI"
          style={{ width: '100%', height: '100%', border: 'none' }}
        />
      </div>
    )
  }

  return (
    <div>
      <>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            <Box sx={{ width: '100%', typography: 'body1', }} >
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} sx={{ position: 'fixed', width: '100%', bgcolor: 'background.paper', zIndex: 1 }}>
                    <Tab label="AI Test Quiz?" value="1" />
                    <Tab label="AI Planner" value="2" />
                    <Tab label="AI Summerizer" value="3" />
                    <Tab label="AI Student Inquiry" value="4" />
                    {/* <Tab label="Teacher AI Approval" value="5" /> */}
                  </TabList>
                </Box>
                <Container sx={{ marginTop: "3rem", marginBottom: "4rem" }}>
                  <TabPanel value="1">
                    <AiQuiz />
                  </TabPanel>
                  <TabPanel value="2">
                    <AiPlanner />
                  </TabPanel>
                  <TabPanel value="3">
                    <AiSummerizer />
                  </TabPanel>
                  <TabPanel value="4">
                    <AiStudents />
                  </TabPanel>
                  {/* <TabPanel value="5">
                    <AiTeachers />
                  </TabPanel> */}
                </Container>
              </TabContext>
            </Box>
          </>
        )}
        <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} />
      </>
    </div>
  )
}

export default AIchat;
