import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
Font.register({
  family: 'Roboto',
  src: path.resolve(process.cwd(), 'fonts/Roboto-Regular.ttf')
});
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#171A26',
    color: '#F1F2F6',
    paddingLeft: 12,
    fontSize: 11,
    fontFamily: 'Roboto',
    lineHeight: 1.4,
    flexDirection: 'row'
  },
  leftColumn: {
    width: '70%',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20
  },
  rightColumn: {
    width: '30%',
    backgroundColor: 'rgb(40, 45, 69)',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderLeft: '1px solid #2c2f3f'
  },
  header: {
    textAlign: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FF8C66',
    borderBottomStyle: 'solid',
    paddingBottom: 8
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF8C66',
    marginBottom: 2,
    letterSpacing: 0.5
  },
  title: {
    fontSize: 12,
    marginBottom: 6,
    marginTop: 4,
    color: '#F1F2F6'
  },
  contact: {
    fontSize: 9,
    color: '#A4A6B3'
  },
  section: {
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ffffff',
    backgroundColor: '#ff6a3d',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 6,
    marginBottom: 8,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: 1
  },
  timelineItem: {
    backgroundColor: '#1B1E2C',
    padding: 10,
    borderRadius: 6,
    borderLeft: '3px solid #FF8C66',
    marginBottom: 8
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#FF8C66',
    marginBottom: 2
  },
  entryText: {
    fontSize: 10,
    color: '#F1F2F6',
    marginBottom: 1
  },
  skillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4
  },
  listItem: {
    backgroundColor: '#FF8C66',
    color: '#171A26',
    fontSize: 9,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    margin: 2,
    fontWeight: 'bold'
  },
  list: {
    fontSize: 10,
    color: '#F1F2F6',
    marginBottom: 4
  }
});
export default function CVDocument({
  data
}) {
  return /*#__PURE__*/React.createElement(Document, null, /*#__PURE__*/React.createElement(Page, {
    size: "A4",
    style: styles.page
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.leftColumn
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.header
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.name
  }, data.personal.fullName), /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, data.personal.title), /*#__PURE__*/React.createElement(Text, {
    style: styles.contact
  }, data.personal.email, " | ", data.personal.location, " | ", data.personal.github, " | ", data.personal.linkedin)), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Summary"), /*#__PURE__*/React.createElement(Text, {
    style: styles.entryText
  }, data.summary)), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Experience"), data.experience.map((exp, i) => /*#__PURE__*/React.createElement(View, {
    key: i,
    style: styles.timelineItem
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.entryTitle
  }, exp.role, " @ ", exp.company), /*#__PURE__*/React.createElement(Text, {
    style: styles.entryText
  }, exp.location, " | ", exp.from, " - ", exp.to), /*#__PURE__*/React.createElement(Text, {
    style: styles.entryText
  }, exp.description)))), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Education"), data.education.map((edu, i) => /*#__PURE__*/React.createElement(View, {
    key: i,
    style: styles.timelineItem
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.entryTitle
  }, edu.degree, " @ ", edu.school), /*#__PURE__*/React.createElement(Text, {
    style: styles.entryText
  }, edu.location, " | ", edu.from, " - ", edu.to))))), /*#__PURE__*/React.createElement(View, {
    style: styles.rightColumn
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Skills"), /*#__PURE__*/React.createElement(View, {
    style: styles.skillGroup
  }, data.skills.map((skill, i) => /*#__PURE__*/React.createElement(Text, {
    key: i,
    style: styles.listItem
  }, skill)))), /*#__PURE__*/React.createElement(View, {
    style: styles.section
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.sectionTitle
  }, "Languages"), data.languages.map((lang, i) => /*#__PURE__*/React.createElement(View, {
    key: i,
    style: styles.timelineItem
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.entryTitle
  }, lang.language), /*#__PURE__*/React.createElement(Text, {
    style: styles.entryText
  }, "Level: ", lang.level)))))));
}
