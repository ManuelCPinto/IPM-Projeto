import React from 'react'

interface AuthorInfoProps {
  info: string
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ info }) => {
  if (!info) {
    return <div>Missing artist details</div>
  }

  return (
    <div className="author-info2">
        <div className='autor-info-text'>
            <strong>Know the author: </strong>{info}
        </div>
    </div>
  )
}
