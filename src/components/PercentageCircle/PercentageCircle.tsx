import React from 'react'

import styles from './PercentageCircle.module.scss'

interface IPercentageCircle {
    percentage: number
}

export const PercentageCircle = (percentage: IPercentageCircle) => {
    const percentageToDeg = (number: number) => {
        let solved = (180 * number) / 50

        if (number > 50) {
            solved = ((number - 50) * 180) / 50
        }

        return solved
    }

    return (
        <div className={styles.circleBorder} style={{
            background: `linear-gradient(${percentageToDeg(percentage.percentage)}deg, ${percentage.percentage > 50 ? 'rgb(34 197 94)' : 'rgb(239 68 68)'} 50%, transparent 50%), linear-gradient(0deg, rgb(34 197 94) 50%, rgb(239 68 68) 50%)`
        }}>
            <div className={styles.circle}>
                <h2 className='text-white'>{percentage.percentage}%</h2>
            </div>
        </div>
    )
}
