export function HomePage(){
    return (
    <div className="container">
      <h1>Public Transport Feedback App</h1>
      <p>Our goal is to improve the quality of public transportation in Bucharest</p>
      <style jsx>{`
        .container {
          margin: 20px;
        }
        h1 {
          color: navy;
          text-align:center;
        }
        p {
          font-size: 20px;
          color: orange;
          text-align:center;
          font-style: italic;
        }
      `}</style>

      <style jsx global>{`
        
      `}</style>
      
    </div>
        )
}