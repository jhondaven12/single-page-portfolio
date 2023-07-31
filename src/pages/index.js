import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { Typewriter } from 'react-simple-typewriter';
import { allProject } from './allProject';
import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import Aos from 'aos';
import 'aos/dist/aos.css';

function Portfolio() {
  const [inputsValue, setInputsValue] = useState({ name: '', email: '',  message: ''});
  const [errorMsg, setErrorMsg] = useState({ name: '', email: '', phone: '' });

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with desired options
  }, []);
  
  const handleInputChange = (event) => {
    const {name, value} = event.target
    setInputsValue({...inputsValue, [name]: value})
    setErrorMsg({...errorMsg, [name]: validateInput(name, value)})
  };

  const handleSubmit = (event) => {
    event.preventDefault()
    if(inputsValue.name.trim() !== '' && inputsValue.email.trim() !== ''){
      const templateParams = {
        from_name: inputsValue.name,
        from_email: inputsValue.email,
        message: inputsValue.message
      };

      emailjs.send('service_2bp4wn8', 'template_mwdhux9', templateParams, 'UL2Kdc1QgBuZAlxf0')
        .then((res) => {
          console.log('Email send successfully', res.status, res.text)
          alert('Email send successfully')
        })
        .catch((err) => {
          console.error('Email sending failed:', err)
        });

      setInputsValue({ name: '', email: '', message: '' });
    }
  };

  const validateInput = (name, value) => {
    switch(name){
      case "name":
        return value.trim() === "" || !/^[a-zA-Z\s]+$/.test(value) ? "Sorry, invalid format here" : "";
      case "email":
        return value.trim() === "" || !/^\S+@\S+\.\S+$/.test(value) ? "Sorry, invalid format here" : "";
      default:
        return '';
    }
  }

  return (
    <>
    <Head>
      <title>Personal Portfolio</title>
      <link rel='icon' href='/logo.png'/>
    </Head>

      <header>
        <nav>
          <div className='logo'>
            <h2>johndaven</h2>
          </div>

          <div>
            <Link href="https://github.com/jhondaven12">
              <div>
                <Image
                  src="/icon-github.svg"
                  alt="github"
                  layout='fill'
                />
              </div>
            </Link>

            <Link href="https://www.facebook.com/prince.conception.05/">
              <div>
                <Image
                  src="/icon-facebook.svg"
                  alt='linkedin'
                  layout='fill'
                />
              </div>
            </Link>

          </div>
        </nav>
      </header>

      <main>
        <section className='intro'>
          <picture  data-aos="fade-in">
            <div className='overlay'></div>
            <source media='(min-width: 768px)' srcSet='/meTwo.png' />
            <img src='/meOne.png' alt='profile' />
          </picture>

          <div className='hero-info' data-aos="fade-right">
            <h1>Nice to   
              <span className='spanOne'> meet you I'm </span>
              <span className='typewritter'>
                {/* Style will be inherited from the parent element */}
                <Typewriter
                  words={['John Daven', 'Developer', 'Dedicated']}
                  loop={false}
                  cursor
                  cursorStyle='|'
                  typeSpeed={100}
                  deleteSpeed={100}
                  delaySpeed={1000}
                />
              </span>
            </h1>
            <p>I'm John Dave Concepcion, I want to be a front end developer.
              I'm ready to learn what I don't know yet. I have acquired
              skills and knowledege to make your project success.</p>

            <div>
              <Link href="#contact">
                CONTACT ME
              </Link>
            </div>
          </div>
        </section>


        <section className='skills'>
          <hr />
          <div className='skills-container'>
            <div>
              <h1>HTML</h1>
              <p>Semantic Elements</p>
            </div>
            <div>
              <h1>CSS</h1>
              <p>Responsive Layout Mobile first</p>
            </div>
            <div>
              <h1>Javascript</h1>
              <p>Basic in javascript</p>
            </div>
            <div>
              <h1>React</h1>
              <p>Basic in React</p>
            </div>
            <div>
              <h1>Sass</h1>
              <p>Basic in Sass</p>
            </div>
            <div>
              <h1>Next Js</h1>
              <p>Basic in NextJS</p>
            </div>
          </div>
          <hr />
        </section>

        <section className='projects'>
          <header>
            <h1>Projects</h1>
            <Link href="#contact">
              CONTACT ME
            </Link>
          </header>

          <div className='project-content'>
            {allProject.map((item, index) => (
              <figure key={index}>
                <div className='image' data-aos="fade-zoom-in"  data-aos-duration="1500">
                  <div className='overlay'>
                    <Link href={item.project}>VIEW PROJECT</Link>
                    <Link href={item.code}>VIEW CODE</Link>
                  </div>
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={1000}
                    height={800}
                    objectFit='cover'
                    objectPosition='center center'
                    priority
                  />
                </div>

                <figcaption>
                  <h1>{item.title}</h1>
                  <h3>{item.languages.join(" ")}</h3>
                </figcaption>

                <ul>
                  <li><Link href="/">VIEW PROJECT</Link></li>
                  <li><Link href="/">VIEW CODE</Link></li>
                </ul>
              </figure>
            ))}
          </div>
        </section>

        <section className='contact' id="contact">

          <address>
            <h1>Contact</h1>
            <ul>
              <li>
              <span>
                <Image src="/mailbox.svg" alt='email' width={20} height={20}/>
              </span>
              <p>princeconcepcion0605@gmail.com</p>
              </li>
              <li>
                <span>
                  <Image src="/mobile-android.svg" alt='mobile' width={20} height={20}/>
                </span>
                <p>+63 967 241 5695</p>
              </li>
              <li>
                <span>
                  <Image src="/map-marker-alt.svg" alt="mailbox" width={20} height={20}/>
                </span>
                <p>Sta Ana, Manila</p>
              </li>
            </ul>
          </address>

          <form onSubmit={handleSubmit} action='submit'>
            <label htmlFor="name">
              <input 
                type='text' 
                id='name' 
                name='name'
                className={
                  errorMsg.name ? "isNotValid" : inputsValue.name ? "isValid" : ""
                }
                value={inputsValue.name}
                onChange={handleInputChange}
                placeholder='NAME'
                />

              {errorMsg.name &&
                <div className='error-icon'>
                <Image
                  src='/icon-error.svg'
                  alt='error'
                  width={25}
                  height={25}
                />
              </div>
              }

              {errorMsg.name &&
                <div className='error-message'>
                  <span>{errorMsg.name}</span>
                </div>
              }
            </label>

            <br/>
            
            <label htmlFor="email">
              <input
                type='email'
                id='email' 
                name='email'
                className={
                  errorMsg.email ? "isNotValid" : inputsValue.email ? "isValid" : ""
                }
                value={inputsValue.email} 
                onChange={handleInputChange}
                placeholder='EMAIL'
              />

              {errorMsg.email &&
                <div className='error-icon'>
                  <Image
                    src='/icon-error.svg'
                    alt='error'
                    width={25}
                    height={25}
                  />
                </div>
              }

              {errorMsg.email &&
                <div className='error-message'>
                  <span>{errorMsg.email}</span>
                </div>
              }
            </label>

            <br/>

            <label htmlFor="message">
              <textarea
                type='text'
                name='message'
                id='message'
                value={inputsValue.message}
                onChange={handleInputChange}
                placeholder='MESSAGE'
                rows={7}
              />
            </label>

            <input type='submit' value='SEND MESSAGE'/>
          </form>
        </section>
      </main>

      <footer>
        <hr />

        <nav>
          <div className='logo'>
            <h2>johndaven</h2>
          </div>

          <div>
            <Link href="https://github.com/jhondaven12">
              <div>
                <Image
                  src="/icon-github.svg"
                  alt="github"
                  width={30}
                  height={30}
                />
              </div>
            </Link>

            <Link href="https://www.facebook.com/prince.conception.05/">
              <div>
                <Image
                  src="/icon-facebook.svg"
                  alt='twitter'
                  width={30}
                  height={30}
                />
              </div>
            </Link>
          </div>
        </nav>
      </footer>

    </>
  )
}
export default Portfolio;