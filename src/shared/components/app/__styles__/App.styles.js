import { Typography } from 'antd'
import { Router as _Router } from '@reach/router'
import styled from '@xstyled/styled-components'

export const Root = styled.div`
	height: 100%;
`

export const Router = styled(_Router)`
	height: 100%;
`

export const Title = styled(Typography.Title)`
	margin: 60px;
	text-align: center;
`
