import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  Download, 
  FileText, 
  Image, 
  Printer,
  Share2,
  Mail,
  Loader2
} from 'lucide-react';
import './ExportFeatures.css';

const ExportFeatures = ({ 
  data, 
  examTitle = 'Exam Results',
  studentName = 'Student',
  examDate = new Date().toLocaleDateString(),
  className = '' 
}) => {
  const [exporting, setExporting] = React.useState(false);
  const [exportType, setExportType] = React.useState(null);

  // Create PDF export
  const exportToPDF = async (detailed = false) => {
    setExporting(true);
    setExportType('pdf');

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      let yPosition = margin;

      // Header
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text(examTitle, margin, yPosition);
      yPosition += 10;

      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Student: ${studentName}`, margin, yPosition);
      yPosition += 7;
      pdf.text(`Date: ${examDate}`, margin, yPosition);
      yPosition += 15;

      // Summary Section
      if (data?.stats) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Summary', margin, yPosition);
        yPosition += 10;

        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        
        const stats = [
          ['Total Questions', data.stats.totalQuestions || 'N/A'],
          ['Correct Answers', data.stats.correctAnswers || 'N/A'],
          ['Incorrect Answers', data.stats.incorrectAnswers || 'N/A'],
          ['Accuracy', `${data.stats.accuracy || 0}%`],
          ['Total Score', `${data.stats.totalScore || 0}/${data.stats.maxScore || 0}`],
          ['Time Taken', data.stats.timeTaken || 'N/A']
        ];

        stats.forEach(([label, value]) => {
          pdf.text(`${label}: ${value}`, margin, yPosition);
          yPosition += 6;
        });

        yPosition += 10;
      }

      // Detailed Results (if requested)
      if (detailed && data?.questions) {
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Detailed Results', margin, yPosition);
        yPosition += 10;

        data.questions.forEach((question, index) => {
          // Check if we need a new page
          if (yPosition > pageHeight - 40) {
            pdf.addPage();
            yPosition = margin;
          }

          pdf.setFontSize(12);
          pdf.setFont('helvetica', 'bold');
          pdf.text(`Question ${index + 1}:`, margin, yPosition);
          yPosition += 7;

          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'normal');
          
          // Question text (wrap text if too long)
          const questionText = question.question || 'No question text';
          const questionLines = pdf.splitTextToSize(questionText, pageWidth - 2 * margin);
          pdf.text(questionLines, margin, yPosition);
          yPosition += questionLines.length * 5 + 3;

          // Your Answer
          pdf.text(`Your Answer: ${question.userAnswer || 'No answer'}`, margin, yPosition);
          yPosition += 5;

          // Correct Answer
          pdf.text(`Correct Answer: ${question.correctAnswer || 'N/A'}`, margin, yPosition);
          yPosition += 5;

          // Status
          const status = question.isCorrect ? 'Correct ✓' : 'Incorrect ✗';
          if (question.isCorrect) {
            pdf.setTextColor(0, 150, 0); // Green for correct
          } else {
            pdf.setTextColor(200, 0, 0); // Red for incorrect
          }
          pdf.text(`Status: ${status}`, margin, yPosition);
          pdf.setTextColor(0, 0, 0); // Reset to black
          yPosition += 10;
        });
      }

      // Save the PDF
      pdf.save(`${examTitle}_${studentName}_${examDate}.pdf`);
    } catch (error) {
      console.error('PDF Export Error:', error);
      alert('Failed to export PDF. Please try again.');
    } finally {
      setExporting(false);
      setExportType(null);
    }
  };

  // Create image export
  const exportToImage = async () => {
    setExporting(true);
    setExportType('image');

    try {
      // Find the results container
      const resultsContainer = document.querySelector('.exam-results-container') || 
                              document.querySelector('.answer-component') ||
                              document.body;

      const canvas = await html2canvas(resultsContainer, {
        height: resultsContainer.scrollHeight,
        width: resultsContainer.scrollWidth,
        useCORS: true,
        scale: 2, // Higher quality
        backgroundColor: '#ffffff',
        removeContainer: false
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `${examTitle}_${studentName}_${examDate}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Image Export Error:', error);
      alert('Failed to export image. Please try again.');
    } finally {
      setExporting(false);
      setExportType(null);
    }
  };

  // Print functionality
  const handlePrint = () => {
    window.print();
  };

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: examTitle,
      text: `Exam Results for ${studentName}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error('Share Error:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copied to clipboard!'))
        .catch(() => alert('Unable to share. Please copy the URL manually.'));
    }
  };

  // Email functionality
  const handleEmail = () => {
    const subject = encodeURIComponent(`Exam Results: ${examTitle}`);
    const body = encodeURIComponent(`
Dear Recipient,

Please find the exam results for ${studentName}.

Exam: ${examTitle}
Date: ${examDate}
${data?.stats ? `Score: ${data.stats.totalScore}/${data.stats.maxScore}` : ''}

View detailed results: ${window.location.href}

Best regards,
StudyStreak Team
    `);

    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  return (
    <div className={`export-features ${className}`}>
      <div className="export-features-header">
        <h3 className="export-features-title">
          <Share2 className="mr-2" size={20} />
          Export & Share
        </h3>
      </div>

      <div className="export-features-grid">
        {/* PDF Export - Summary */}
        <button
          onClick={() => exportToPDF(false)}
          disabled={exporting}
          className="export-btn export-btn-primary"
        >
          {exporting && exportType === 'pdf' ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : (
            <FileText className="mr-2" size={16} />
          )}
          Export PDF Summary
        </button>

        {/* PDF Export - Detailed */}
        <button
          onClick={() => exportToPDF(true)}
          disabled={exporting}
          className="export-btn export-btn-secondary"
        >
          {exporting && exportType === 'pdf' ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : (
            <Download className="mr-2" size={16} />
          )}
          Detailed PDF Report
        </button>

        {/* Image Export */}
        <button
          onClick={exportToImage}
          disabled={exporting}
          className="export-btn export-btn-outline"
        >
          {exporting && exportType === 'image' ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : (
            <Image className="mr-2" size={16} />
          )}
          Save as Image
        </button>

        {/* Print */}
        <button
          onClick={handlePrint}
          disabled={exporting}
          className="export-btn export-btn-outline"
        >
          <Printer className="mr-2" size={16} />
          Print Results
        </button>

        {/* Share */}
        <button
          onClick={handleShare}
          disabled={exporting}
          className="export-btn export-btn-info"
        >
          <Share2 className="mr-2" size={16} />
          Share Link
        </button>

        {/* Email */}
        <button
          onClick={handleEmail}
          disabled={exporting}
          className="export-btn export-btn-success"
        >
          <Mail className="mr-2" size={16} />
          Email Results
        </button>
      </div>

      {/* Export Status */}
      {exporting && (
        <div className="export-status">
          <div className="export-status-content">
            <Loader2 className="animate-spin mr-2" size={16} />
            <span>
              {exportType === 'pdf' ? 'Generating PDF...' : 
               exportType === 'image' ? 'Creating image...' : 
               'Processing...'}
            </span>
          </div>
        </div>
      )}

      {/* Quick Stats for Export */}
      {data?.stats && (
        <div className="export-quick-stats">
          <h4 className="export-quick-stats-title">Quick Summary</h4>
          <div className="export-quick-stats-grid">
            <div className="export-stat">
              <span className="export-stat-value">{data.stats.totalScore || 0}</span>
              <span className="export-stat-label">Score</span>
            </div>
            <div className="export-stat">
              <span className="export-stat-value">{data.stats.accuracy || 0}%</span>
              <span className="export-stat-label">Accuracy</span>
            </div>
            <div className="export-stat">
              <span className="export-stat-value">{data.stats.correctAnswers || 0}</span>
              <span className="export-stat-label">Correct</span>
            </div>
            <div className="export-stat">
              <span className="export-stat-value">{data.stats.totalQuestions || 0}</span>
              <span className="export-stat-label">Questions</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExportFeatures;