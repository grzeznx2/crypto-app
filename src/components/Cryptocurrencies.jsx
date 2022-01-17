import { Card, Col, Row } from 'antd'
import millify from 'millify'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count)
  const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
  if (isFetching) return <>Loading...</>

  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map(({ id, rank, name, iconUrl, price, marketCap, change }) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={id}>
            <Link to={`/crypto/${id}`}>
              <Card
                title={`${rank}. ${name}`}
                extra={<img className="crypto-image" src={iconUrl} alt={name} />}
                hoverable
              >
                <p>Price: {millify(price)}</p>
                <p>Market Cap: {millify(marketCap)}</p>
                <p>Daily Change: {millify(change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Cryptocurrencies
