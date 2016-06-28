import React, { Component, PropTypes } from 'react'
export const fields = [ 'firstName', 'lastName', 'email' ]

class AddRelationsToForm extends Component {
    render() {
        const {
            fields: { firstName, lastName, email },
            handleSubmit,
            resetForm,
            submitting
        } = this.props
        return (<form onSubmit={handleSubmit}>
                <div>
                    <label>Fornavn</label>
                    <div>
                        <input type="text" placeholder="Fornavn" {...firstName}/>
                    </div>
                </div>
                <div>
                    <label>Etternavn</label>
                    <div>
                        <input type="text" placeholder="Etternavn" {...lastName}/>
                    </div>
                </div>
                <div>
                    <label>Email</label>
                    <div>
                        <input type="email" placeholder="Email" {...email}/>
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={submitting}>
                        {submitting ? <i/> : <i/>} Submit
                    </button>
                    <button type="button" disabled={submitting} onClick={resetForm}>
                        Clear Values
                    </button>
                </div>
            </form>
        )
    }
}
