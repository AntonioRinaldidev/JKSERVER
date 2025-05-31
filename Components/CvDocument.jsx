import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Font.register({
  family: 'Roboto',
  src: path.resolve(process.cwd(), 'fonts/Roboto-Regular.ttf'),
});

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#171A26',
    color: '#F1F2F6',
    paddingLeft: 12,
    fontSize: 11,
    fontFamily: 'Roboto',
    lineHeight: 1.4,
    flexDirection: 'row',
  },
  leftColumn: {
    width: '70%',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 20,
  },
  rightColumn: {
    width: '30%',
    backgroundColor:'rgb(40, 45, 69)',
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    borderLeft: '1px solid #2c2f3f',
  },
  header: {
    textAlign: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#FF8C66',
    borderBottomStyle: 'solid',
    paddingBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF8C66',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 12,
    marginBottom: 6,
    marginTop: 4,
    color: '#F1F2F6',
  },
  contact: {
    fontSize: 9,
    color: '#A4A6B3',
  },
  section: {
    marginBottom: 16,
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
    letterSpacing: 1,
  },
  timelineItem: {
    backgroundColor: '#1B1E2C',
    padding: 10,
    borderRadius: 6,
    borderLeft: '3px solid #FF8C66',
    marginBottom: 8,
  },
  entryTitle: {
    fontSize: 11,
    fontWeight: 600,
    color: '#FF8C66',
    marginBottom: 2,
  },
  entryText: {
    fontSize: 10,
    color: '#F1F2F6',
    marginBottom: 1,
  },
  skillGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  listItem: {
    backgroundColor: '#FF8C66',
    color: '#171A26',
    fontSize: 9,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 10,
    margin: 2,
    fontWeight: 'bold',
  },
  list: {
    fontSize: 10,
    color: '#F1F2F6',
    marginBottom: 4,
  },
});


export default function CVDocument({ data }) {
	return (
		<Document>
		  <Page size="A4" style={styles.page}>
			<View style={styles.leftColumn}>
			  <View style={styles.header}>
				<Text style={styles.name}>{data.personal.fullName}</Text>
				<Text style={styles.title}>{data.personal.title}</Text>
				<Text style={styles.contact}>
				  {data.personal.email} | {data.personal.location} | {data.personal.github} | {data.personal.linkedin}
				</Text>
			  </View>
	
			  <View style={styles.section}>
				<Text style={styles.sectionTitle}>Summary</Text>
				<Text style={styles.entryText}>{data.summary}</Text>
			  </View>
	
			  <View style={styles.section}>
				<Text style={styles.sectionTitle}>Experience</Text>
				{data.experience.map((exp, i) => (
				  <View key={i} style={styles.timelineItem}>
					<Text style={styles.entryTitle}>{exp.role} @ {exp.company}</Text>
					<Text style={styles.entryText}>{exp.location} | {exp.from} - {exp.to}</Text>
					<Text style={styles.entryText}>{exp.description}</Text>
				  </View>
				))}
			  </View>
	
			  <View style={styles.section}>
				<Text style={styles.sectionTitle}>Education</Text>
				{data.education.map((edu, i) => (
				  <View key={i} style={styles.timelineItem}>
					<Text style={styles.entryTitle}>{edu.degree} @ {edu.school}</Text>
					<Text style={styles.entryText}>{edu.location} | {edu.from} - {edu.to}</Text>
				  </View>
				))}
			  </View>
			</View>
	
			<View style={styles.rightColumn}>
			  <View style={styles.section}>
				<Text style={styles.sectionTitle}>Skills</Text>
				<View style={styles.skillGroup}>
				  {data.skills.map((skill, i) => (
					<Text key={i} style={styles.listItem}>{skill}</Text>
				  ))}
				</View>
			  </View>
	
			  <View style={styles.section}>
				<Text style={styles.sectionTitle}>Languages</Text>
				{data.languages.map((lang, i) => (
				  <View key={i} style={styles.timelineItem}>
					<Text style={styles.entryTitle}>{lang.language}</Text>
					<Text style={styles.entryText}>Level: {lang.level}</Text>
				  </View>
				))}
			  </View>
			</View>
		  </Page>
		</Document>
	  );
}