import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-text-container">
        <h1 className="home-heading">Clothes That Get YOU Noticed</h1>
        <p className="description">
          Fashion is part of the daily air fiosd foi dsocv oidscvio sdfiov io
          fviodsfiovoidviodsiv sdf oasdfoi dsfiods ifo sdiocviosd ioc diov
          ioadiovf daiof iodsfioadsiofaosdivio asdiov oiasd vfioadoifvoidaf
          oiasdfoi daiof ioasdfb iosadb fiosad iof oidf dfioadf d fai dsfoiad
          oif iodfioa sdofiods fiodasiof dfoiasd oif aiod fioad io oaidf oadf
          aoidf oia oadsf aio foid o asofnds aod sfoasd fidosfiosd io fiosd foi
          dsocv oidscvio sdfiov io fviodsfiovoidviodsiv sdf oasdfoi dsfiods ifo
          sdiocviosd ioc diov ioadiovf daiof iodsfioadsiofaosdivio asdiov oiasd
          vfioadoifvoidaf oiasdfoi daiof ioasdfb iosadb fiosad iof oidf dfioadf
          d fai dsfoiad oif iodfioa sdofiods fiodasiof dfoiasd oif aiod fioad io
          oaidf oadf aoidf oia oadsf aio foid o
        </p>
        <button className="signout-btn" type="button">
          Shop Now
        </button>
      </div>
      <img
        className="home-img"
        alt="clothes that get you noticed"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
      />
    </div>
  </>
)

export default Home
