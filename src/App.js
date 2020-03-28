import React, { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Sketch from 'react-p5'

import './bootstrap.min.css'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'

import './App.css'

import initiate from './initiate'
import populate from './populate'
import statistic from './statistic'

const initialState = {
  population: 250,
  mortality: 2,
  recoveryPeriod: 14,
  socialDistance: 10,
  initialCase: 1,
  isolationObject: 0
}

const schema = Yup.object({
  population: Yup.number().integer().min(2).max(400).required(),
  mortality: Yup.number().min(0).max(100).required(),
  recoveryPeriod: Yup.number().min(1).required(),
  socialDistance: Yup.number().min(0).max(100).required(),
  initialCase: Yup.number().min(1).required()
})

const i8 = {
  english: {
    language: 'English',
    title: 'Disease Outbreak Simulator',
    subtitle: 'Original Post : Why outbreaks like coronavirus spread exponentially, and how to "flatten the curve"',
    description: (
      <>
        Getting inspired by <a href='https://www.washingtonpost.com/graphics/2020/world/corona-simulator/'>an article in Washington Post</a>,
      I decided to remake the simulation. This simulation try to emphasize how important social distance is
      to reduce the spread of the disease. This simulation might be not accurate and just for educational purposes only.
      </>
    ),
    population: 'Population (person)',
    recovery: 'Recovery Period (time unit)',
    mortality: 'Mortality Rate (percent)',
    initialCase: 'Initial Case (person)',
    socialDistance: 'Social Distance (percent)',
    simulate: 'Simulate',
    healthy: 'Healthy',
    sick: 'Sick',
    recovered: 'Recovered',
    dead: 'Dead',
    count: 'Count',
    overtime: 'Change overtime',
    disclaimer: (
      <>
        <b>Disclaimer: </b> The content of this website does not constitute medical advice.
      The information provided above is meant to be an educational purpose.
      There is no guarantee for scientific evidence to this simulator.
      There is also no guarantee that following these guidelines will reduce the risk of getting infected with SARS-CoV-2 or any other viral or bacterial contagion.
      All information provided on this website is given with the best intent to educate for the impact of social distancing.
      In no event shall the website operators be held liable for any claim, damages or other liabilities.
      If you have concerns or comments about the information provided on this website, please write to me <a href='mailto:tirtadwipa.manunggal@gmail.com'>tirtadwipa.manunggal@gmail.com</a>.
      </>
    ),
    resolution: 'Please use desktop or wider monitor resolution or desktop mode if you are in mobile, and then reload the page.',
    stayathome: (<>supporting <a href='https://staythefuckhome.com/'>#staythefuckhome</a></>)
  },
  indonesia: {
    language: 'Bahasa Indonesia',
    title: 'Simulator Penyebaran Wabah',
    subtitle: 'Kiriman Asli : Mengapa wabah seperti coronavirus menyebar secara eksponensial, dan bagaimana cara untuk "menekan kurva tersebut"',
    description: (
      <>
        Terinspirasi dari <a href='https://www.washingtonpost.com/graphics/2020/world/corona-simulator/'>sebuah artikel dari Washington Post</a>,
      kami memutuskan untuk membuat ulang simulasi yang ada pada situs tersebut. Simulasi ini mencoba menekankan
      pentingnya apa yang disebut <i>social distance</i> untuk mengurangi dampak dari penyebaran sebuah wabah penyakit.
      Simulasi ini mungkin tidak bisa akurat dan hanya dipergunakan untuk kepentingan edukasi.
      </>
    ),
    population: 'Populasi (orang)',
    recovery: 'Masa Penyembuhan (satuan waktu)',
    mortality: 'Mortalitas (persen)',
    initialCase: 'Kasus Awalan (orang)',
    socialDistance: 'Jarak Sosial (persen)',
    simulate: 'Simulasikan',
    healthy: 'Sehat',
    sick: 'Sakit',
    recovered: 'Sembuh',
    dead: 'Meninggal',
    count: 'Cacah Jiwa',
    overtime: 'Dinamika Terhadap Waktu',
    disclaimer: (
      <>
        <b>Sangkalan: </b> Konten dari situs ini bukan merupakan saran medis.
      Informasi yang disajikan di atas ditujukan semata-mata untuk kepentingan edukasi.
      Tidak ada jaminan kebenaran secara saintifik atas simulator ini. Tidak
      ada jaminan pula bahwa petunjuk dalam simulasi ini akan mengurangi resiko
      terinfeksi SARS-CoV-2 atau penyakit menular dari bakteri maupun virus. Semua
      maklumat yang disajikan dalam situs ini diumumkan dengan niat mengedukasi pentingnya
      dampak penjarakan sosial. Dalam keadaan apa pun, operator situs tidak bertanggung jawab atas klaim, kerusakan, atau kerugian lainnya.
      Jika ada persoalan maupun saran yang ingin diberikan tentang informasi dalam laman ini, bisa diarahkan ke <a href='mailto:tirtadwipa.manunggal@gmail.com'>tirtadwipa.manunggal@gmail.com</a>.
      </>
    ),
    resolution: 'Mohon gunakan komputer desktop atau layar yang lebih lebar atau mode desktop jika Anda mengakses melalui gawai, kemudian segarkan laman.',
    stayathome: (<>mendukung <a href='https://diamdirumahcuk.com/'>#diamdirumahcuk</a></>)
  }
}

function ParameterForm ({ onSubmit, language, isActive }) {
  return (
    <Formik
      validationSchema={schema}
      onSubmit={values => {
        onSubmit(values)
      }}
      initialValues={initialState}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md='4' controlId='validationFormik01'>
              <Form.Label>{i8[language].population}</Form.Label>
              <Form.Control
                type='number'
                name='population'
                value={values.population}
                onChange={handleChange}
                isValid={touched.population && !errors.population}
              />
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationFormik02'>
              <Form.Label>{i8[language].recovery}</Form.Label>
              <Form.Control
                type='number'
                name='recoveryPeriod'
                value={values.recoveryPeriod}
                onChange={handleChange}
                isValid={touched.recoveryPeriod && !errors.recoveryPeriod}
              />
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationFormik01'>
              <Form.Label>{i8[language].mortality}</Form.Label>
              <Form.Control
                type='number'
                name='mortality'
                value={values.mortality}
                onChange={handleChange}
                isValid={touched.mortality && !errors.mortality}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} md='4' controlId='validationFormik01'>
              <Form.Label>{i8[language].initialCase}</Form.Label>
              <Form.Control
                type='number'
                name='initialCase'
                value={values.initialCase}
                onChange={handleChange}
                isValid={touched.initialCase && !errors.initialCase}
              />
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationFormik02'>
              <Form.Label>{i8[language].socialDistance}</Form.Label>
              <Form.Control
                type='number'
                name='socialDistance'
                value={values.socialDistance}
                onChange={handleChange}
                isValid={touched.socialDistance && !errors.socialDistance}
              />
            </Form.Group>
          </Form.Row>
          {
            !isActive ? (
              <>
                <Button className='my-3' variant='primary' size='lg' type='submit'>{i8[language].simulate}</Button>
              </>
            ) : <></>
          }

        </Form>
      )}
    </Formik>
  )
}

const worldState = {
  i8,
  language: null,
  statistic: {
    healthy: 0, sick: 0, recovered: 0, dead: 0, total: 1
  },
  population: [],
  iteration: 0,
  period: 10,
  height: 0,
  width: 0,
  reference: { x: 30, y: 20 },
  boundary: {
    xl: 30,
    xr: 0,
    yt: 150,
    yb: 0
  }
}

const App = () => {
  const { innerWidth, innerHeight } = window
  const [parameters, setParameters] = useState(initialState)
  const [isStarted, setStarted] = useState(false)
  const [language, setLanguage] = useState('english')

  worldState.language = language
  worldState.height = 0.45 * 0.75 * innerWidth
  worldState.width = 0.75 * innerWidth
  worldState.boundary.xr = (0.75 * innerWidth) - 30
  worldState.boundary.yb = (0.45 * 0.75 * innerWidth) - 20

  const goSimulate = (values) => {
    setParameters(values)
    setStarted(true)
    window.scrollTo({
      behavior: 'smooth',
      top: innerHeight
    })
  }

  const setup = (p5, parent) => {
    p5.createCanvas(worldState.width, worldState.height).parent(parent)
    p5.noStroke()
    initiate(p5, parameters, worldState)
  }

  const draw = p5 => {
    if (isStarted) {
      statistic(p5, worldState)
      populate(p5, worldState)
    }
  }

  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Container>
            <Nav className='mr-auto'>
              <NavDropdown title={i8[language].language} id='basic-nav-dropdown'>
                <NavDropdown.Item onClick={() => setLanguage('english')}> English</NavDropdown.Item>
                <NavDropdown.Item onClick={() => setLanguage('indonesia')}>Bahasa Indonesia</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <Navbar.Brand>{i8[language].stayathome}</Navbar.Brand>
            </Form>
          </Container>
        </Navbar.Collapse>
      </Navbar>
      <Container className='mt-5'>
        <h1 className='header' style={{ fontSize: '48pt' }}>{i8[language].title}</h1>
        <h4 className='header mb-5'>{i8[language].subtitle}</h4>
        <p className='mb-5' style={{ fontSize: '16pt' }}>{i8[language].description}</p>
        <ParameterForm onSubmit={goSimulate} language={language} isActive={isStarted} />

        {
          isStarted ? (worldState.height < 320) ? <>  <Button className='my-5' variant='outline-danger'>{i8[language].resolution}</Button></> : (
            <>
              <Sketch style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} className='mt-5 pb-5' setup={setup} draw={draw} />
              <div>
                <small className='pb-5'>{i8[language].disclaimer}</small>
                <div className='mt-5' style={{ backgroundColor: '#fff', borderTop: '1px solid #E7E7E7', textAlign: 'center', padding: '15px', left: '0', bottom: '0', height: '60px', width: '100%' }}>
                  <small>Created with curiosity by <a href='https://github.com/linerocks'>linerocks</a></small>
                </div>
              </div>
            </>
          ) : <></>
        }
      </Container>
    </>
  )
}

export default App
