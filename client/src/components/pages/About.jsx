import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/system";

const AboutContainer = styled("div")({
  padding: "20px",
  maxWidth: "900px",
  margin: "auto",
});

const Heading = styled("h1")({
  marginBottom: "10px",
});

const SubHeading = styled("h2")({
  marginBottom: "10px",
});

const KeyFeaturesList = styled(List)({
  padding: 0,
});

const KeyFeaturesListItem = styled(ListItem)({
  marginBottom: "10px",
});

const UserBenefitsList = styled(List)({
  marginTop: "10px",
});

const UserBenefitsListItem = styled(ListItem)({
  marginBottom: "10px",
});

export const About = () => {
  return (
    <AboutContainer>
      <Heading>Welcome to Task Management</Heading>
      <Typography>
        At Task Management, our mission is to empower individuals and teams to achieve their goals with efficient and intuitive task management. We understand the challenges of staying organized and productive, and our app is designed to simplify the process, making task management a breeze.
      </Typography>
      <SubHeading>Key Features:</SubHeading>
      <KeyFeaturesList disablePadding>
        <KeyFeaturesListItem>
          <ListItemText>
            <Typography component="div">
              <strong>Task Creation and Assignment:</strong> Easily create tasks and assign them to team members or collaborators. Streamline communication and keep everyone on the same page.
            </Typography>
          </ListItemText>
        </KeyFeaturesListItem>
        {/* Repeat the structure for other key features */}
      </KeyFeaturesList>
      <SubHeading>User Benefits:</SubHeading>
      <UserBenefitsList>
        <ListItemText>
          <Typography>
            Management is not just a tool; it's a productivity ally. By using our app, you can:
          </Typography>
        </ListItemText>
        <UserBenefitsListItem>
          <ListItemText>
            <Typography>Boost productivity and efficiency in your personal and professional tasks.</Typography>
          </ListItemText>
        </UserBenefitsListItem>
        {/* Repeat the structure for other user benefits */}
      </UserBenefitsList>
    </AboutContainer>
  );
};
