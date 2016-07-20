import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchCities } from '../../modules/cities';
import { select } from 'redux-crud-store';
import { fromJS } from 'immutable';

class Landingpage extends Component {
  componentWillMount() {
  }

  componentWillReceiveProps(nextProps) {
    const { cities } = nextProps;
    const { dispatch } = this.props;
    if (cities.needsFetch) {
      dispatch(cities.fetch);
    }
  }

  render() {
    const { cities } = this.props;
    return (
      <div>
        <section
          className={
              'hero hero-position-bottom hero-spacing'
          }
        >
          <div className="container">
            <h1 className="h-font text-primary">XXX</h1>
            <h2 className="h-font">XXX</h2>

            <div className={'styles'}>
              <div className={'styles'}>
                <select className="c-select">
                  <option value="">Choose your city</option>
                    {cities.data.map((city) => (
                      <option key={city.slug} value={city.slug}>{city.name}</option>
                    ))}
                </select>
              </div>
              <div className={'styles'}>
                <button type="submit" className="btn btn-primary btn-lg">
                  Discover
                </button>
              </div>
              <div className={'styles'}>
                <a href="#" className="btn btn-primary-outline btn-lg">
                  Free Sign Up
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Landingpage.propTypes = {
  cities: PropTypes.object,
  dispatch: PropTypes.func
};

function mapStateToProps(state) {
  return { cities: select(fetchCities(), fromJS(state.models)) };
}

export default connect(mapStateToProps)(Landingpage);
