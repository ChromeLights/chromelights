import React, { Component } from 'react';
import Annotations from '../components/Annotations';
import Interactive from '../components/Interactive';

export default class EntryContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { entryId, fetch, hlPropsId, title, content, user, date, downVote, upVote, comments, currentUser } = this.props;
        return (
            <div className="chromelights-entry">
                <h3>{title}</h3>
                <Annotations
                    content={content}
                    user={user}
                    date={date} />
                <Interactive
                    highlightId={hlPropsId}
                    fetch={fetch}
                    entryId={entryId}
                    downVote={downVote}
                    upVote={upVote}
                    comments={comments}
                    user={user}
                    currentUser={currentUser} />
            </div>
        )
    }
}
