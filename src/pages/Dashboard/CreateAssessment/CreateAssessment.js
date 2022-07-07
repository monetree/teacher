import React, { useState } from 'react'
import AssessmentContext from '../../../context/AssessmentContext'
import Step1 from './Steps/Step1'
import Step2 from './Steps/Step2'
import './CreateAssessment.css'
import Step3 from './Steps/Step3'
import Step4 from './Steps/Step4'
import { useQuery, useMutation, gql } from '@apollo/client'

const steps = [
	{
		title: 'Start',
	},
	{
		title: 'Choose Question',
	},
	{
		title: 'Preview',
	},
	{
		title: 'Done',
	},
]

const CreateAssessmentComponent = () => {
	const { assessmentData, setAssessmentData } = React.useContext(AssessmentContext)

	const [currentStep, setCurrentStep] = React.useState(0)

	const QUERIES = gql`
		query {
			getStreams {
				id
				stream_info
			}

			getGrades {
				id
				grade_info
			}
			getCurriculums {
				id
				curriculum_shortname
			}

			getSubjects {
				id
				subject_info
			}

			getChapters {
				id
				chapter_name
			}

			getLevels {
				id
				level_info
			}
		}
	`

	const QUESTION_QUERIES = gql`
		query getQuestions(
			$subjectRef: ID!
			$gradeRef: ID!
			$chapterRef: ID!
			$streamRef: ID!
			$curriculumRef: ID!
		) {
			getQuestions(
				subjectRef: $subjectRef
				gradeRef: $gradeRef
				chapterRef: $chapterRef
				streamRef: $streamRef
				curriculumRef: $curriculumRef
			) {
				question_info
				question_type
				question_type
				options
				level
				id
				answer
			}
		}
	`

	const MUTATIONS = gql`
		mutation createQuestion(
			$subjectRef: String!
			$gradeRef: String!
			$chapterRef: String!
			$streamRef: String!
			$curriculumRef: String!
			$teacherRef: String!
			$published: Boolean!
			$questions: [String!]
		) {
			createAssessment(
				subjectRef: $subjectRef
				gradeRef: $gradeRef
				chapterRef: $chapterRef
				streamRef: $streamRef
				curriculumRef: $curriculumRef
				teacherRef: $teacherRef
				published: $published
				questions: $questions
			) {
				published
				assessment_id
			}
		}
	`

	const [fetchQuestions, setFetchQuestions] = useState(false)

	const {
		loading: _loading2,
		error: _error2,
		data: _data2,
	} = useQuery(QUESTION_QUERIES, {
		variables: fetchQuestions
			? {
					subjectRef: assessmentData.step1.subject.id,
					gradeRef: assessmentData.step1.grade.id,
					chapterRef: assessmentData.step1.chapter.id,
					streamRef: assessmentData.step1.stream.id,
					curriculumRef: assessmentData.step1.curriculum.id,
			  }
			: {},
	})

	const stepValidator = () => {
		if (currentStep === 0) {
			if (assessmentData.step1) {
				setCurrentStep(currentStep + 1)
				setFetchQuestions(true)
			}
		}
		if (currentStep === 1) {
			if (assessmentData.step2) {
				setCurrentStep(currentStep + 1)
			}
		}
	}

	const { loading, error, data } = useQuery(QUERIES)
	const [createAssessment, { loading: _loading, error: _error, data: _data }] =
		useMutation(MUTATIONS)

	const handleSubmit = () => {
		const data = {
			...assessmentData.step1,
			questions: [...assessmentData.step2],
		}
		console.log(data)

		let ids = []
		for (let i of data.questions) {
			ids.push(i.id)
		}

		const subjectRef = data.subject.id
		const gradeRef = data.grade.id
		const chapterRef = data.chapter.id
		const streamRef = data.stream.id
		const curriculumRef = data.curriculum.id
		const teacherRef = localStorage.getItem('teacher')
		const published = true
		const questions = ids

		createAssessment({
			variables: {
				subjectRef,
				gradeRef,
				chapterRef,
				streamRef,
				curriculumRef,
				teacherRef,
				published,
				questions,
			},
		})

		setAssessmentData({
			step1: null,
			step2: null,
		})
		setCurrentStep(currentStep + 1)
	}

	return (
		<div className='createAssessment'>
			<div className='create__steps'>
				{steps.map((step, index) => {
					return (
						<div
							className={
								currentStep === index
									? 'create__step current'
									: currentStep > index
									? 'create__step done'
									: 'create__step'
							}
							key={index}
						>
							<div className={index === 3 ? 'step-indicator done' : 'step-indicator'}>
								{index === 3 ? (
									<ion-icon name='checkmark-outline'></ion-icon>
								) : (
									index + 1
								)}
							</div>
							<div className='step-title'>{step.title}</div>
						</div>
					)
				})}
			</div>

			{/*---------------------- this is step content ----------------------*/}

			{data && data.getCurriculums ? (
				<div className='step__content'>{currentStep === 0 && <Step1 data={data} />}</div>
			) : _data2 && _data2.getQuestions ? (
				<div className='step__content'>
					{currentStep === 1 && <Step2 data={_data2} />}
					{currentStep === 2 && <Step3 goto={setCurrentStep} />}
					{currentStep === 3 && <Step4 goto={setCurrentStep} />}
				</div>
			) : (
				<div className='step__content'></div>
			)}

			{/* ------------------ this is step navigation ---------------------- */}

			<div className='step__navigation'>
				{currentStep > 0 ? (
					currentStep <= steps.length - 2 && (
						<button
							className='step__back'
							onClick={() => setCurrentStep(currentStep - 1)}
						>
							{`Prev: ${steps[currentStep - 1]?.title}`}
						</button>
					)
				) : (
					<span></span>
				)}

				{currentStep === steps.length - 1 ? (
					<span></span>
				) : (
					<button
						className='step__next'
						onClick={() => {
							if (currentStep === steps.length - 2) {
								handleSubmit()
							} else {
								stepValidator()
							}
						}}
						disabled={
							(currentStep === 0 && !assessmentData.step1) ||
							(currentStep === 1 && !(assessmentData.step2.length > 0))
						}
					>
						{currentStep === 1
							? 'Next: Preview'
							: currentStep === 2
							? 'Submit'
							: `Next: ${steps[currentStep + 1]?.title}`}
					</button>
				)}
			</div>
		</div>
	)
}

export default CreateAssessmentComponent
